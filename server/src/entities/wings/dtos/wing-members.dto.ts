import {Role} from "../enums/participate-role";
import {FriendRequestStatus} from "../../friendships/enums/friend-request-status";

export class WingMembersDto {
    id: number;
    name: string;
    role: Role;
    status: FriendRequestStatus;
}
