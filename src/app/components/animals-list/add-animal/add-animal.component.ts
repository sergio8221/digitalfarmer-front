import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Animal, AnimalsService, Placing, Species } from 'src/app/services/animals/animals.service';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent implements OnInit {

  /**
   * Object to update
   */
  @Input() objectUpdate: Animal;

  /**
   * Msg to be returned by modal
   */
  @Output() returnMsg = new EventEmitter<Msg>();

  /**
   * Create object form
   */
  createForm: FormGroup;

  /**
   * List of species
   */
  speciesList: Species[];

  /**
   * List of placings
   */
  placingsList: Placing[];

  constructor(private animalsService: AnimalsService, private languageService: LanguageService, private usersService: UsersService) {
    // Init form
    this.createForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]),
      sex: new FormControl('F', [
        Validators.required
      ]),
      born: new FormControl(null, [
        Validators.required
      ]),
      placing: new FormControl(null, [
        Validators.required
      ]),
      species: new FormControl(null, [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    // Load species list
    this.speciesList = [];
    this.loadSpecies();

    // Load placings list
    this.placingsList = [];
    this.loadPlacings();

    // Load today date
    this.createForm.get('born').setValue(this.animalsService.parseDateString(new Date()));

    // If update selected load values into form
    if (this.objectUpdate) {
      this.loadUpdate();
    }

  }

  /**
   * Load list of species
   */
  loadSpecies() {
    this.animalsService.getAllSpecies().subscribe((data: Species[]) => {
      this.speciesList = this.translateSpecies(data);

      if (!this.objectUpdate) {
        this.createForm.get('species').setValue(this.speciesList[0].id)
      }
    })
  }

  /**
   * Transalte species names
   */
  translateSpecies(species: Species[]): Species[] {
    species.forEach(spec => {
      let specTranslation = {
        cow: 'Vacuno',
        pig: 'Porcino',
        horse: 'Equino',
        sheep: 'Ovino',
        hen: 'Gallina',
        dog: 'Perro'
      }
      spec.name = specTranslation[spec.name];
    })

    return species;
  }

  /**
   * Load list of placings
   */
  loadPlacings() {
    this.animalsService.getAllPlacings().subscribe((data: Placing[]) => {
      this.placingsList = data;

      if (!this.objectUpdate) {
        this.createForm.get('placing').setValue(this.placingsList[0].id)
      }
    })
  }

  /**
   * Create object on database
   */
  create() {
    // Create object
    let newObject: Animal = {
      id: null,
      name: this.createForm.get('name').value,
      code: this.createForm.get('code').value,
      born: this.createForm.get('born').value,
      sex: this.createForm.get('sex').value,
      placing: {
        id: this.createForm.get('placing').value,
        name: null
      },
      species: {
        id: this.createForm.get('species').value,
        name: null
      }
    };

    // Send object to database
    this.animalsService.createAnimal(newObject).subscribe(data => {
      // Emit success
      this.returnMsg.emit(this.languageService.msgs.createSuccess);
    }, error => {
      // Emit error
      this.returnMsg.emit(this.languageService.msgs.createError);
    });

  }

  /**
   * Fill form with update info
   */
  loadUpdate() {
    this.createForm.get('name').setValue(this.objectUpdate.name);
    this.createForm.get('code').setValue(this.objectUpdate.code);
    this.createForm.get('sex').setValue(this.objectUpdate.sex);
    this.createForm.get('placing').setValue(this.objectUpdate.placing.id);
    this.createForm.get('species').setValue(this.objectUpdate.species.id);

    // Load born date
    this.createForm.get('born').setValue(this.animalsService.parseDateString(this.objectUpdate.born));
  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newObject: Animal = {
      id: this.objectUpdate.id,
      name: this.createForm.get('name').value,
      code: this.createForm.get('code').value,
      born: this.createForm.get('born').value,
      sex: this.createForm.get('sex').value,
      placing: {
        id: this.createForm.get('placing').value,
        name: null
      },
      species: {
        id: this.createForm.get('species').value,
        name: null
      }
    };

    // Send object to database
    this.animalsService.updateAnimal(newObject).subscribe(data => {
      // Emit success
      this.returnMsg.emit(this.languageService.msgs.updateSuccess);
    }, error => {
      // Emit error
      this.returnMsg.emit(this.languageService.msgs.updateError);
    });

  }

  /**
   * Delete object on database
   */
  delete() {
    // Delete object from database
    this.animalsService.deleteAnimal(this.objectUpdate.id).subscribe(data => {
      // Emit success
      this.returnMsg.emit(this.languageService.msgs.deleteSuccess);
    }, error => {
      // Emit error
      this.returnMsg.emit(this.languageService.msgs.deleteError);
    });
  }

  /**
   * Cancel operation
   */
  cancel() {
    this.returnMsg.emit(null);
  }

}
