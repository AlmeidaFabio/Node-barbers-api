import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCoversTable1620481431429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"covers",
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
                        type:"int",
                        isNullable:true
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
                        name:"FKUserCovers",
                        columnNames:["user_id"],
                        referencedColumnNames:["id"],
                        referencedTableName:"users",
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("covers")
    }

}
