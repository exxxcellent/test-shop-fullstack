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

    public async sendLoginLink(to: string, link: string) {
        await this.mailerService.sendMail({
            to,
            subject: `Перейдите по ссылке и войдите в аккаунт`,
            html: `
                <h1>Перейдите по ссылке и войдите в аккаунт/<h1>
                <a href="${link}">Войти</a>
            `,
        });
    }

    public async sendMailOrderCreated(to: string, itemId: string) {
        const { title, id } = await this.itemService.getOneById(itemId);
        await this.mailerService.sendMail({
            to,
            subject: `Заказ №${id} оформлен, ждет оплаты`,
            html: `
                <h1>Заказ №${id} оформлен, ждет оплаты</h1>
                </hr>
                <b>Вы заказали:</b>
                <div>
                    <h2>${title}</h2>
                </div>
            `,
        });
    }

    public async sendMailErrorItemAmount(to: string, itemId: string) {
        const { title } = await this.itemService.getOneById(itemId);
        await this.mailerService.sendMail({
            to,
            subject: `Заказ не оформлен, товар закончился`,
            html: `
                <h1>Заказ не оформлен, товар закончился</h1>
                </hr>
                <b>Вы хотели заказать:</b>
                <div>
                    <h2>${title}</h2>
                </div>
            `,
        });
    }

    public async sendMailErrorBalance(to: string, itemId: string) {
        const { title } = await this.itemService.getOneById(itemId);
        await this.mailerService.sendMail({
            to,
            subject: `Заказ не оплачен, на балансе не хватает средств`,
            html: `
                <h1>Заказ не оплачен, на балансе не хватает средств</h1>
                </hr>
                <b>Вы хотели заказать:</b>
                <div>
                    <h2>${title}</h2>
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
            subject: `Ваш заказ ${statusRu}`,
            html: `
                <h1>Ваш заказ ${statusRu}</h1>
                </hr>
                <b>Ваш заказ:</b>
                <div>
                    <h2>${title}</h2>
                </div>
            `,
        });
    }
}
