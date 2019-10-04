local cjson = require "cjson"
local jwt = require "resty.jwt"

local validator = {}

function validator.sendError()
    ngx.status = ngx.HTTP_FORBIDDEN
    ngx.say(cjson.encode({ message = "ERR_FORBIDDEN" }))  
    return ngx.exit(ngx.HTTP_FORBIDDEN)  
end

function validator.validation()
    local jwt_token = ngx.var.http_authorization
    local jwt_obj = jwt:verify("thatssomesuperultrasecretyoucouldneverimagine", jwt_token)
    
    if jwt_obj.verified then
        return true
    else
        validator.sendError()
        return false
    end
end

return validator;
