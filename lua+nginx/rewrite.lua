ngx.arg[1] = string.upper(ngx.arg[1]);
ngx.arg[1] = string.gsub(ngx.arg[1], "LUA%-MACROS", "resolved by lua");

--ngx.log(ngx.STDERR, 'p1');
ngx.log(ngx.STDERR, ngx.arg[1]);

--print('p1')

--local function resolveMacros()
--	print('p2')
--	if ngx.re.find(ngx.arg[1], '{LUA-MACROS}') then
--		print('p3')
--        ngx.arg[1] = ngx.re.sub(ngx.arg[1], '{lLUA-MACROS}', 'resolved by lua')
--    end
--end


--return resolveMacros();