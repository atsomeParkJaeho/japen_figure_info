import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity.js';
import { CreateBoardDto } from './dto/create-board.dto.js';
import { UpdateBoardDto } from './dto/update-board.dto.js';
import { currentDatePart, currentTimePart } from '../common/date-time.util.js';

const AUTHOR_SELECT = { no: true, id: true, nickname: true } as const;

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async list(
    boardId: string,
    page = 1,
    limit = 20,
  ): Promise<{ items: Board[]; total: number; page: number; limit: number }> {
    const [items, total] = await this.boardsRepository.findAndCount({
      where: { boardId },
      order: { no: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: { createUser: true },
      select: { createUser: AUTHOR_SELECT },
    });

    return { items, total, page, limit };
  }

  async getOne(boardId: string, no: number): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: { no, boardId },
      relations: { createUser: true },
      select: { createUser: AUTHOR_SELECT },
    });
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return board;
  }

  async create(
    boardId: string,
    createUserNo: number,
    dto: CreateBoardDto,
  ): Promise<Board> {
    const board = this.boardsRepository.create({
      boardId,
      createUserNo,
      name: dto.name,
      content: dto.content,
    });
    return this.boardsRepository.save(board);
  }

  async update(
    boardId: string,
    no: number,
    createUserNo: number,
    dto: UpdateBoardDto,
  ): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: { no, boardId },
    });
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    if (board.createUserNo !== createUserNo) {
      throw new ForbiddenException('본인 게시글만 수정할 수 있습니다.');
    }

    board.name = dto.name;
    board.content = dto.content;
    board.eDate = currentDatePart();
    board.eTime = currentTimePart();
    return this.boardsRepository.save(board);
  }

  async remove(boardId: string, no: number, createUserNo: number): Promise<void> {
    const board = await this.boardsRepository.findOne({
      where: { no, boardId },
    });
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    if (board.createUserNo !== createUserNo) {
      throw new ForbiddenException('본인 게시글만 삭제할 수 있습니다.');
    }

    await this.boardsRepository.remove(board);
  }
}
