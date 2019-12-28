import { Component, OnInit, Input } from '@angular/core';
import { Msg } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-msg-modal',
  templateUrl: './msg-modal.component.html',
  styleUrls: ['./msg-modal.component.scss']
})
export class MsgModalComponent implements OnInit {

  @Input() msg: Msg;

  constructor() { }

  ngOnInit() {
  }

}
