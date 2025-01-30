import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { OrderStatusRu } from '@shared/enums';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly itemService: ItemService,
    ) {}

    public async sendActivationLink(to: string, link: string) {
        await this.mailerService.sendMail({
            to,
            subject: `Активация аккаунта на ${process.env.HOST}`,
            html: `
                <h1>Перейдите по ссылке ниже, чтобы активировать аккаунт<h1>
                <a href="${link}">Активировать</a>
            `,
        });
    }

    public async sendMailOrderCreated(to: string, itemId: string) {
        const { title } = await this.itemService.getOneById(itemId);
        await this.mailerService.sendMail({
            to,
            subject: `Заказ для ${to} создан`,
            html: `
                <h1>Заказ для ${to} успешно создан.<h1>
                </hr>
                <b>Вы заказали:</b>
                <div>
                    <h2>${title}<h2>
                </div>
            `,
        });
    }

    public async sendMailOrderUpdateStatus(
        to: string,
        itemId: string,
        status: OrderStatus,
    ) {
        const { title } = await this.itemService.getOneById(itemId);
        const statusRu = OrderStatusRu[status];
        await this.mailerService.sendMail({
            to,
            subject: `Статус вашего заказа изменился (${statusRu})`,
            html: `
                <h1>Статус вашего заказа изменился <span style="text-transform: capitalize;">(${statusRu})</span>.<h1>
                </hr>
                <b>Ваш заказ:</b>
                <div>
                    <h2>${title}<h2>
                </div>
            `,
        });
    }
}
