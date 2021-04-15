import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createReviewsTable1618512339325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"reviews",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"user_id",
                        type:"int"
                    },
                    {
                        name:"barber_id",
                        type:"int"
                    },
                    {
                        name:"title",
                        type:"varchar(50)"
                    },
                    {
                        name:"body",
                        type:"varchar"
                    },
                    {
                        name:"rate",
                        type:"double(8,2)"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUserReview",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKBarberReview",
                        referencedTableName:"barbers",
                        referencedColumnNames:["id"],
                        columnNames:["barber_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reviews")
    }

}
