import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Nome do produto',
        example: 'NomedoprodutoExemplo',
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'URL da imagem do produto',
        example: 'https://exemplo.com/imagem.jpg',
        required: false,
    })
    @IsString()
    @IsOptional()
    imageUrl?: string;
}
