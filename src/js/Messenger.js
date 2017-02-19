class Messenger {
    constructor() {}
    remove(messages, message) {
        delete messages.active[message._id];
        return messages;
    }
    put(messages, message) {
        var _id = messages._id++;
        message._id = _id;
        message.time = new Date();
        message.title = message.type;
        messages.active[_id] = message;
        return messages;
    }
}
