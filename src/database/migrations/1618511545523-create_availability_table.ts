import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAvailabilityTable1618511545523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"availability",
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
                        name:"weekday",
                        type:"int"
                    },
                    {
                        name:"hours",
                        type:"text"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKBarberAvail",
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
        await queryRunner.dropTable("availability")
    }

}
