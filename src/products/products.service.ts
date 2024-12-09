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
  ) { }

  create(product: Partial<Product>, userId: number) {
    try {
      return this.productRepository.save({ ...product, user: { id: userId } });
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while creating product')
    }
  }

  findAll(userId: number) {
    try {
      return this.productRepository.find({ where: { user: { id: userId } } });
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while fetching products')
    }
  }

  update(id: number, product: Partial<Product>, userId: number) {
    try {
      return this.productRepository.update({ id, user: { id: userId } }, product);
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while updating products')
    }
  }

  remove(id: number, userId: number) {
    try {
     return this.productRepository.delete({ id, user: { id: userId } });
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while deleting products')
    }
  }
  handleFileUpload(file: Express.Multer.File) {
    try {
      return { message: 'File uploaded successfully', filePath: file.path };
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while updating products')
    }
  }
}
