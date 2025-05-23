import { sendMessage } from "@taozi-chrome-extensions/common/src/messageServer";
import App from "./AppPopup.vue";
import { createApp } from "./createApp";
import { MessageType } from "@taozi-chrome-extensions/common/src/constant/messageType";

createApp(App);

sendMessage({
  type: MessageType.PopupOpen
});
