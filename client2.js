const mqtt = require("mqtt");
const protobuf = require("protobufjs");

const client = mqtt.connect("", {
  clientId: "",
  username: "",
  password: "",
});

const Test = {
  //enums from proto
  Enum_0: 0,
  Enum_1: 1,
  Enum_2: 2,
  Enum_3: 3,
  Enum_4: 4
};

//GENERIC
const TYPE = "generic_";
const data = {
  ID: 1234,
  generic: Test.Enum_3,
  verified: true,
  User: "TestString",
  numbers: [1, 2, 3, 4, 5],
}; //from protobuf

//after these consts you can run the client2 and take the sent data
//in a reciever

//simulating a module sending a report
try {
  protobuf.load("message.proto", function (err, root) {
    if (err) throw err;

    // Obtain a message type
    var encoder = root.lookupType(TYPE);

    // Exemplary payload
    //remember that on this lib a "_" on the .proto means a upper case in the code
    var payload = data;

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = encoder.verify(payload);
    if (errMsg) throw Error(errMsg);

    // Create a new message
    var message = encoder.create(payload); // or use .fromObject if conversion is necessary

    var buffer = encoder.encode(message).finish();
    // var buffer = '08a51310063807'; //DEBUG

    console.log("msg: " + buffer.toString("hex"));

    // client.publish('route/' + ID + '/' + TYPE.slice(0, TYPE.length - 1) + '/report', buffer);
    // console.log('publish: ' + 'device/' + SERIAL + '/' + TYPE.slice(0, TYPE.length - 1) + '/request')
    // client.publish('route/' + ID + '/' + TYPE.slice(0, TYPE.length - 1) + '/request', buffer);
  });
} catch (error) {
  console.log(error);
}
