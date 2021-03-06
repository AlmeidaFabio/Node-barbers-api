import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createBarberservicesTable1618416038431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"services",
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
                        name:"name",
                        type:"varchar"
                    },
                    {
                        name:"price",
                        type:"double"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKBarber",
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
        await queryRunner.dropTable("services");
    }

}
