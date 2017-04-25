import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(){
  }
}

// using route?
// TODO: "README" screen at end
// TODO: set npm registry
// TODO: make dynamic validator using eval
// TODO: load app from remote
// TODO: load schemas from remote
// TODO: remote logger

// TODO: add web.config to root workspace with control-access-allow-origin header = *
// <?xml version="1.0" encoding="UTF-8"?>
// <configuration>
//   <system.webServer>
//     <httpProtocol>
//       <customHeaders>
//         <add name="Access-Control-Allow-Origin" value="*" />
//       </customHeaders>
//     </httpProtocol>
//   </system.webServer>
// </configuration>

// TODO: make an "build infra" feature
// TODO: make an "update all" feature
// TODO: support for generating routing module
