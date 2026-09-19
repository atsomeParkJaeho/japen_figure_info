import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { BoardsService } from './boards.service.js';
import { CreateBoardDto } from './dto/create-board.dto.js';
import { UpdateBoardDto } from './dto/update-board.dto.js';

interface AuthenticatedRequest {
  user: { no: number; id: string };
}

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get(':boardId/posts')
  list(
    @Param('boardId') boardId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.boardsService.list(
      boardId,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );
  }

  @Get(':boardId/posts/:no')
  getOne(
    @Param('boardId') boardId: string,
    @Param('no', ParseIntPipe) no: number,
  ) {
    return this.boardsService.getOne(boardId, no);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':boardId/posts')
  create(
    @Param('boardId') boardId: string,
    @Body() dto: CreateBoardDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.create(boardId, req.user.no, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':boardId/posts/:no')
  update(
    @Param('boardId') boardId: string,
    @Param('no', ParseIntPipe) no: number,
    @Body() dto: UpdateBoardDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.update(boardId, no, req.user.no, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':boardId/posts/:no')
  remove(
    @Param('boardId') boardId: string,
    @Param('no', ParseIntPipe) no: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.remove(boardId, no, req.user.no);
  }
}
