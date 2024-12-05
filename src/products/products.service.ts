import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ){}

  create(product: Partial<Product>, userId: number) {
    return this.productRepository.save({ ...product, user: { id: userId } });
  }

  findAll(userId: number) {
    return this.productRepository.find({ where: { user: { id: userId } } });
  }

  update(id: number, product: Partial<Product>, userId: number) {
    return this.productRepository.update({ id, user: { id: userId } }, product);
  }

  remove(id: number, userId: number) {
    return this.productRepository.delete({ id, user: { id: userId } });
  }
  handleFileUpload(file: Express.Multer.File) {
    return { message: 'File uploaded successfully', filePath: file.path };
  }
}
