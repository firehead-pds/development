import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Friendship } from '../friendships/friendship.entity';

@Injectable()
export class GridService {
  private grid: number[][];

  constructor() {
    this.grid = [];
  }

  organizeUsers(users: User[], friendships: Friendship[]): number[][] {
    const friendsByUser = new Map<number, number>();
    friendships.forEach((friendship) => {
      if (friendsByUser.has(friendship.creator.id)) {
        friendsByUser.set(
          friendship.creator.id,
          friendsByUser.get(friendship.creator.id) + 1,
        );
      } else {
        friendsByUser.set(friendship.creator.id, 1);
      }
      if (friendsByUser.has(friendship.receiver.id)) {
        friendsByUser.set(
          friendship.receiver.id,
          friendsByUser.get(friendship.receiver.id) + 1,
        );
      } else {
        friendsByUser.set(friendship.receiver.id, 1);
      }
    });

    users.sort((a, b) => {
      const friendsA = friendsByUser.get(a.id) || 0;
      const friendsB = friendsByUser.get(b.id) || 0;
      return friendsB - friendsA;
    });

    this.grid = Array.from({ length: 7 }, () => Array(11).fill(0));

    users.forEach((usuario, index) => {
      let positionFound = false;
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 11; col++) {
          if (!this.grid[row][col]) {
            this.grid[row][col] = usuario.id;
            positionFound = true;
            break;
          }
        }
        if (positionFound) break;
      }
    });

    return this.grid;
  }
}
