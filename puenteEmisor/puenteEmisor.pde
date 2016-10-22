/**
 * oscP5sendreceive by andreas schlegel
 * example shows how to send and receive osc messages.
 * oscP5 website at http://www.sojamo.de/oscP5
 */
 
import oscP5.*;
import netP5.*;
  
OscP5 oscP5;
NetAddress myRemoteLocation;

void setup() {
  /* start oscP5, listening for incoming messages at port 12000 */
  oscP5 = new OscP5(this, 10000);
  
  /* myRemoteLocation is a NetAddress. a NetAddress takes 2 parameters,
   * an ip address and a port number. myRemoteLocation is used as parameter in
   * oscP5.send() when sending osc packets to another computer, device, 
   * application. usage see below. for testing purposes the listening port
   * and the port of the remote location address are the same, hence you will
   * send messages back to this sketch.
   */
  myRemoteLocation = new NetAddress("192.168.0.19", 10000);
}


void draw() { 
}


void oscEvent(OscMessage theOscMessage) {
  int sticker = 0;
  int team = int(theOscMessage.get(0).floatValue()); // Teams 0,1 Goal: 2
  if (theOscMessage.get(1) != null) {
    sticker = int(theOscMessage.get(1).stringValue());
  }
  print(" addrpattern: " + theOscMessage.addrPattern());
  println(" typetag: " + theOscMessage.typetag());
  println(" team: " + team);
  println(" sticker: " + sticker);
  
  OscMessage myMessage = new OscMessage("/anti");
  
  myMessage.add(team); /* add an int to the osc message */
  myMessage.add(sticker);

  /* send the message */
  oscP5.send(myMessage, myRemoteLocation);
  
  
  
}