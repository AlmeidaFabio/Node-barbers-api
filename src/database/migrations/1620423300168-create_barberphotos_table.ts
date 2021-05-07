import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createBarberphotosTable1620423300168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"barberphotos",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"barber_id",
                        type:"int"
                    },
                    {
                        name:"key",
                        type:"varchar"
                    },
                    {
                        name:"filename",
                        type:"varchar"
                    },
                    {
                        name:"url",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKBarberPhotos",
                        columnNames:["barber_id"],
                        referencedColumnNames:["id"],
                        referencedTableName:"barbers",
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("barberphotos")
    }

}
