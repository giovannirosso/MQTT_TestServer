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
  Enum_4: 4,
};

client.on("connect", () => {
  console.log("CONNECTED");

  client.subscribe("route/" + ID + "/generic/report");
  //... all subs
});

client.on("message", (topic, payload) => {
  console.log("TOPIC       ", topic);

  try {
    protobuf.load("message.proto", function (err, root) {
      if (err) throw err;

      var decoder = null;

      //all the topics from message.proto
      if (0);
      else if (topic.includes("generic_")) {
        //from mqtt
        decoder = root.lookupType("generic_"); //from protobuf
      }

      if (decoder != null) {
        var message = decoder.decode(payload);

        var errMsg = decoder.verify(message);
        if (errMsg) throw errMsg;

        //shows the sent data
        console.log(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
