import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {} {
    return {
      projectDevelopedBy: [
        {
          developer: 'Davi J. Duarte',
          github: 'https://github.com/DaviJDuarte',
          role: 'Full Stack',
        },
        {
          developer: 'Igor Aguiar',
          github: 'https://github.com/AguiarIgor',
          role: 'Front End',
        },
      ],
      description:
        'This project serves as the backend REST API to a brazilian carnival school organization app',
      link: 'The working webapp is available at: https://firehead.vercel.app/',
      warning: 'How did you get here anyway?',
    };
  }
}
