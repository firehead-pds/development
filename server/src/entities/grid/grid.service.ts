import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Friendship } from '../friendships/friendship.entity';

@Injectable()
export class GridService {
  private grid: number[][];

  constructor() {
    this.grid = [];
  }

  organizarUsuarios(usuarios: User[], amizades: Friendship[]): number[][] {
    const amigosPorUsuario = new Map<number, number>();
    amizades.forEach((amizade) => {
      if (amigosPorUsuario.has(amizade.creator.id)) {
        amigosPorUsuario.set(
          amizade.creator.id,
          amigosPorUsuario.get(amizade.creator.id) + 1,
        );
      } else {
        amigosPorUsuario.set(amizade.creator.id, 1);
      }
      if (amigosPorUsuario.has(amizade.receiver.id)) {
        amigosPorUsuario.set(
          amizade.receiver.id,
          amigosPorUsuario.get(amizade.receiver.id) + 1,
        );
      } else {
        amigosPorUsuario.set(amizade.receiver.id, 1);
      }
    });

    usuarios.sort((a, b) => {
      const amigosA = amigosPorUsuario.get(a.id) || 0;
      const amigosB = amigosPorUsuario.get(b.id) || 0;
      return amigosB - amigosA;
    });

    this.grid = Array.from({ length: 7 }, () => Array(11).fill(0));

    usuarios.forEach((usuario, index) => {
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
