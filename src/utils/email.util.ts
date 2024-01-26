import axios from "axios";
import { env } from "../environments/env";

export class Email {
  private toEmail: string;
  private dynamicTemplateData: DynamicTemplateData;
  private apiUrl: string = "https://api.sendgrid.com/v3/mail/send";
  private apiKey: string;

  constructor(email: string, dynamicTemplateData: DynamicTemplateData) {
    this.toEmail = email;
    this.dynamicTemplateData = dynamicTemplateData;
    this.apiKey = env().sendGridApiKey;
  }

  private send(templateId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const data = {
        from: {
          email: "aziz_assad@yahoo.com",
        },
        personalizations: [
          {
            to: [
              {
                email: this.toEmail,
              },
            ],
            dynamic_template_data: this.dynamicTemplateData,
          },
        ],
        template_id: templateId,
      };

      const config = {
        method: "post",
        url: this.apiUrl,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        data,
      };
      axios(config)
        .then((res) => {
          return resolve(true);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  async sendVerification() {
    return await this.send("d-e00f990fdfeb444888752857bfa4ed1b");
  }

}

type DynamicTemplateData = { [key: string]: any };
