
const Base =  "http://192.168.1.16:3000/api";

const API = {
    Base,
    Item: {
        Add:      Base + "/add",
        Remove:   Base + "/remove",
        Decrease: Base + "/decrease",
        Increase:   Base + "/increase",
        GetAll:   Base + "/get-items"
    }
}

const EventName = {
    Item: {
        Add: "added-item",
        Remove: "removed-item",
        Decrease: "decrease-item",
        Increase: "increase-item"
    }
}
export { API, EventName };