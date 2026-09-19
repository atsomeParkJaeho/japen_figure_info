import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  async fetchHtml(url: string): Promise<string> {
    const { data } = await axios.get<string>(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; JapenFigureInfoBot/1.0; +https://example.com/bot)',
      },
      timeout: 10_000,
    });
    return data;
  }

  async fetchDocument(url: string): Promise<cheerio.CheerioAPI> {
    const html = await this.fetchHtml(url);
    return cheerio.load(html);
  }
}
