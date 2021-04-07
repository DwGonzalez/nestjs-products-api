import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private productModel: Model<Product>) { }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return products;
    }

    async getProduct(productId: string): Promise<Product> {
        const product = await this.productModel.findById(productId);
        return product;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const createdProduct = new this.productModel(createProductDTO);
        return await createdProduct.save();
    }

    async deleteProduct(productId: String): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndDelete(productId);
        return deletedProduct;
    }

    async updateProduct(productId: String, createProductDTO: CreateProductDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId,
            createProductDTO, { new: true });
        return updatedProduct;
    }
}
