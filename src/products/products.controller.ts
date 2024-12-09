import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: { name: string }, @Req() req) {
    console.log
    return this.productsService.create(createProductDto, req.user.userId);
  }

  @Get()
  findAll(@Req() req) {
    return this.productsService.findAll(req.user.userId);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateProductDto: { name: string }, @Req() req) {
    return this.productsService.update(+id, updateProductDto, req.user.userId);
  }

  @Delete()
  remove(@Query('id') id: string, @Req() req) {
    return this.productsService.remove(+id, req.user.userId);
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo recebido');
    }
    const filePath = `https://apitesteaddimition.online/uploads/${file.filename}`;
    return { url: filePath };
  }

}
