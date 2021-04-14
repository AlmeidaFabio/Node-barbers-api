import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersTable1618349720341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"name",
                        type:"varchar(150)",
                    },
                    {
                        name:"lastname",
                        type:"varchar(150)",
                    },
                    {
                        name:"email",
                        type:"varchar(150)",
                        isUnique:true
                    },
                    {
                        name:"password",
                        type:"varchar(200)",
                    },
                    {
                        name:"address",
                        type:"varchar",
                    },
                    {
                        name:"whatsapp",
                        type:"varchar(15)",
                    },
                    {
                        name:"isBarber",
                        type:"tinyint",
                        default:false
                    },
                    {
                        name:"latitude",
                        type:"varchar(250)",
                        isNullable:true
                    },
                    {
                        name:"longitude",
                        type:"varchar(250)",
                        isNullable:true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
