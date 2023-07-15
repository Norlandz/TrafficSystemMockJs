### introduction

TrafficSystemMock is an program that simulates traffic, you can: 
- build a MapFile & Roadways
- move a Vehicle along a path
- use TrafficDetectors to detect & get movement info about the vehicles

### demo

- ![Demo Img](<TrafficSystemMock Demo 20230714_230239Z Intro .png>)

- Demo Vid <video src="TrafficSystemMock%20Demo%2020230714_225153%20Intro%20.mp4" controls title="Demo Vid"></video>

### how to use

1. start the server -- run Java (Javafx & Spring & Mysql)
1. open the html file -- run Javascript (React)
1. create the demo (Map & Vehicle)
1. place vehicle in map 
1. click & move the vehilce in the map
2. ...

### technology stack

- Java
- JavaFx
- Hibernate
- Mysql
- Spring
- Javascript
- Typescript
- React
- SpringMvc
- Websocket (minor)
- RxJava (minor)
- H2 (minor)
- TestFx

### prior statement & misc

- this is an experimental project (incompleted)
- no documentations is written 
- no code comments
- ... (incompleted design & functionalities)

### compare to another project -- TrafficSystem vs TrafficSystemMock

- TrafficSystem - focus mainly on
  - freehand movement (control like in RTS, there is no Path to restrict the movement) 
  - find path algorithm (though many attempts, the algorithm ends up fall back to the original old way)
  - collision detection
- TrafficSystemMock - focus mainly on
  - path connection design
  - persistence to database
  - movement animation mechanism (speed & batch) (though, not much better)
  - TrafficDetector
  - design webpage app in React; communication bt Javascript & Java;

- *(will fix the project naming problem)*
