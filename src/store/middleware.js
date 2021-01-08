import { default as app } from "./state/app/middleware";
import { default as conversations } from "./state/conversations/middleware";
import { default as entity } from "./state/entity/middleware";
import { default as contacts } from "./state/contacts/middleware";

export default [...app, ...conversations, ...entity, ...contacts];
