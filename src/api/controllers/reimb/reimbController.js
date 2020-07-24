const { validationResult } = require("express-validator");
const sequelize = require("sequelize");
const moment = require("moment");
//helper file to prepare responses.
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');
const db = require('../../../config/connections');
const { TYPES, PAY, PURPOSE, MODE } = require('../../../helpers/constants');
const { dateFormat } = require('../../../helpers/utility');


module.exports = {

    async index(req, res) {
        var err = {
                    "message": ""
                };
        var meta ={
                    "status": 200,
                   
                }
        try {

            let {
                pageId, size,
                type, mode,
                pay, purpose,
            } = req.query;

            let pageListId = 1;
            let pageSize = 16;

            if (pageId) {
                pageListId = pageId;
            }

            if (size) {
                pageSize = +size;
            }

            const offset = (pageListId - 1) * pageSize;

            const options = {
                where: {},
                order: [['createdAt', 'desc']],
                limit: pageSize,
                offset,
            };

            if (mode) {
                options.where.mode = MODE.indexOf(mode)+1;
            }
            if (pay) {
                options.where.pay = PAY.indexOf(pay)+1;
            }
            if (purpose) {
                options.where.purpose = PURPOSE.indexOf(purpose)+1;
            }

            if (type === 'conveyance'){
                var { count, rows: results } = await db.conveyance.findAndCountAll(options);
            }else{
                var { count, rows: results } = await db.hotel.findAndCountAll(options);
            }
            
            if(count){
                    // var data = [];
                meta.count = count;

                meta.pageId = pageListId;
                meta.from = offset;
                meta.size = pageSize;
                meta.total_page = Math.ceil(meta.count / pageSize);
                
                for (result of results){
                    result.dataValues.createdAt = dateFormat(result.dataValues.createdAt);
                    result.dataValues.updatedAt = dateFormat(result.dataValues.updatedAt);
                }

                return apiResp.apiResp( req, res, results, meta );
            }else{
                err.message = "DATA not found";
                return apiResp.apiErr( req, res, 404, err);
            }
        } catch (err) {
             //throw error in json response with status 500.
            console.log(err);
            return apiResp.apiErr( req, res, 400, err);
        }
    },

    async create(req, res) {
        try {
            const err = {};
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                err.message = errors.errors

                return apiResp.apiErr( req, res, 400, err);

                // Display sanitized values/errors messages.
                // return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                const body = JSON.parse(req.body.data);  
                if (!req.file){
                    err.message = "File is not provided";
                    return apiResp.apiErr( req, res, 400,err);
                }

                // const body = req.body;
                const type = body.type;
                delete body.type;

                if (!type){
                    err.message = "type is required";
                    return apiResp.apiErr( req, res, 400,err);
                }
                body.pay = PAY.indexOf(body.pay)+1;
                body.mode = MODE.indexOf(body.mode)+1;

                body.attachment = req.file.filename;

                if (type === 'conveyance'){
                    body.purpose = PURPOSE.indexOf(body.purpose)+1;
                    let conveyance = await db.conveyance.findOne({ where: {invoice: body.invoice} });
                    if (conveyance === null){
                        const result = await db.conveyance.create(body);

                        if (!result){
                            return apiResp.apiErr( req, res, 400,err);  
                        } 
                        
                        let meta = {
                            'status': 201
                        };
                        return apiResp.apiResp( req, res, result, meta );
                    }
                    else {
                        err.message = "Duplicate Invoice";
                        return apiResp.apiErr( req, res, 409,err);
                    }

                }else{
                    let hotel = await db.hotel.findOne({ where: {invoice: body.invoice},raw:true });
                    console.log(hotel)
                    if (hotel === null){
                        const result = await db.hotel.create(body);

                        if (!result){
                            return apiResp.apiErr( req, res, 400,err);  
                        } 
                        
                        let meta = {
                            'status': 201
                        };
                        return apiResp.apiResp( req, res, result, meta );
                    }
                    else {
                        err.message = "Duplicate Invoice";
                        return apiResp.apiErr( req, res, 409,err);
                    }

                }
                // body.types = TYPES.indexOf();
            }
        } catch (err) {
            //throw error in json response with status 500.
            console.log(err);
            return apiResp.apiErr( req, res, 400, err);

        }
    },

    async show(req, res) {
        const err = {};
        try {
            const { type,id } = req.params;
            if (type === 'conveyance'){
                var result = await db.conveyance.findByPk(+id,{raw:true});
            }else{
                var result = await db.hotel.findByPk(+id,{raw:true});
            console.log(result)
            }

            if (result === null){
                return apiResp.apiErr( req, res, 400,err);  
            } 
            
            let meta = {
                'status': 200
            };
            result.createdAt = dateFormat(result.createdAt);
            result.updatedAt = dateFormat(result.updatedAt);

            if(type==='hotel'){
                result.from_date = dateFormat(result.from_date);
                result.to_date = dateFormat(result.to_date);
            }
            return apiResp.apiResp( req, res, result, meta );

        } catch (err) {
             //throw error in json response with status 500.
            console.log(err);
            return apiResp.apiErr( req, res, 400, err);
        }
    },

    

    
}

