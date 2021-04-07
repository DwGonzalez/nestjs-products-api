import {
    Controller, Get, Post, Put, Delete, Res, HttpStatus, Body,
    Param, NotFoundException, Query
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products
        });
    };

    @Get('/:productId')
    async getProduct(@Res() res, @Param('productId') productId) {
        const product = await this.productService.getProduct(productId);
        if (!product) throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json(product);
    };

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product created',
            product
        });
    };

    //@Delete('/delete')
    @Delete('/delete/:productId')
    // You can create the same request making a query
    // async deleteProduct(@Res() res, @Query('productId') productId)
    async deleteProduct(@Res() res, @Param('productId') productId) {
        const product = await this.productService.deleteProduct(productId);
        if (!product) throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted'
        });
    };

    @Put('/update/')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO,
        @Query('productId') productId) {
        const updatedProduct = await this.productService.updateProduct(productId,
            createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product updated',
            updatedProduct
        });
    }

}
