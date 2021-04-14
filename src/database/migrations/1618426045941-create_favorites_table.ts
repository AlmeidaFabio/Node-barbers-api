import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createFavoritesTable1618426045941 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"favorites",
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
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUser",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKBarbers",
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
        await queryRunner.dropTable("favorites");
    }

}
