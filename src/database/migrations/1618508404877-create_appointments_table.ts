import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAppointmentsTable1618508404877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"appointments",
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
                        name:"service_id",
                        type:"int"
                    },
                    {
                        name:"ap_datetime",
                        type:"timestamp"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUserAp",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKBarbersAp",
                        referencedTableName:"barbers",
                        referencedColumnNames:["id"],
                        columnNames:["barber_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKServiceAp",
                        referencedTableName:"services",
                        referencedColumnNames:["id"],
                        columnNames:["service_id"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments")
    }

}
