import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({
    description: "Informações do produto",
    type: CreateProductDto,
    examples: {
      "application/json":{
        value: {
          name: "Furadeira",
          imageUrl: "https:furadeira.png"
        }
      }
    }
  })
  create(@Body() createProductDto: CreateUserDto, @Req() req) {
    try {
      return this.productsService.create(createProductDto, req.user.userId);
    } catch (erro: any) {
      throw new InternalServerErrorException('Erro ao fazer upload do arquivo');
    }
  }

  @ApiOperation({ summary: 'Get all product' })
  @ApiResponse({ status: 200, description: 'Products fetched successfully' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  findAll(@Req() req) {
    try {
      return this.productsService.findAll(req.user.userId);
    } catch (erro: any) {
      throw new InternalServerErrorException('Erro ao fazer carregar todos os produtos');
    }

  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 201, description: 'Product updated successfully' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({
    description: "Informações do produto",
    type: CreateProductDto,
    examples: {
      "application/json":{
        value: {
          name: "Furadeira Philco",
          imageUrl: "https:furadeira.png"
        }
      }
    }
  })
  @Patch()
  update(@Query('id') id: string, @Body() updateProductDto: { name: string }, @Req() req) {
    try {
      return this.productsService.update(+id, updateProductDto, req.user.userId);
    } catch (erro: any) {
      throw new InternalServerErrorException('Erro ao atualizar um produto');
    }
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 401, description: 'Not authorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: "id",
    description: 'Id do produto',
    type: Number,
    example: 1
  })
  @Delete()
  remove(@Query('id') id: string, @Req() req) {
    try {
      return this.productsService.remove(+id, req.user.userId);
    } catch (erro: any) {
      throw new InternalServerErrorException('Erro ao deletar produto');
    }
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('Nenhum arquivo recebido');
      }
      const filePath = `https://apitesteaddimition.online/uploads/${file.filename}`;
      return { url: filePath };
    } catch (erro: any) {
      throw new InternalServerErrorException('Erro ao fazer upload do arquivo');
    }
  }

}
