import { Component, OnInit } from '@angular/core';
import { renderer } from '../node/renderer'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app works!';

  ngOnInit(){
    renderer.writeFile('./my-folder/my-file.txt', 'my contents');
  }
}
