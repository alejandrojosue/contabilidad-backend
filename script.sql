
-- Eliminar las tablas existentes (si ya existen)
DROP TABLE IF EXISTS public.up_roles CASCADE;
DROP TABLE IF EXISTS public.up_permissions CASCADE;
DROP TABLE IF EXISTS public.up_users CASCADE;
DROP TABLE IF EXISTS public.up_users_tokens CASCADE;
DROP TABLE IF EXISTS public.strapi_administrator CASCADE;
DROP TABLE IF EXISTS public.strapi_admin_roles CASCADE;
DROP TABLE IF EXISTS public.strapi_admin_roles_links CASCADE;
DROP TABLE IF EXISTS public.strapi_admin_permissions CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;

-- Eliminar las funciones y procedimientos existentes
DROP FUNCTION IF EXISTS audit_trigger_function CASCADE;
DROP FUNCTION IF EXISTS create_audit_triggers CASCADE;

-- Eliminar los índices existentes
DROP INDEX IF EXISTS idx_up_users_email;
DROP INDEX IF EXISTS idx_up_users_username;
DROP INDEX IF EXISTS idx_up_permissions_role_id;
DROP INDEX IF EXISTS idx_up_users_role_id;
DROP INDEX IF EXISTS idx_audit_logs_id;
DROP INDEX IF EXISTS idx_audit_logs_created_at;
DROP INDEX IF EXISTS idx_audit_logs_user_id_created_at;
DROP INDEX IF EXISTS idx_audit_logs_id_created_at_table;


DROP VIEW IF EXISTS VAULOG;


-- Eliminar los índices primero
DROP INDEX IF EXISTS public.idx_categories_name;
DROP INDEX IF EXISTS public.idx_products_id;

-- Eliminar la tabla intermedia primero (para evitar problemas de restricción de clave foránea)
DROP TABLE IF EXISTS public.product_categories CASCADE;

-- Luego eliminar la tabla de productos
DROP TABLE IF EXISTS public.products CASCADE;

-- Finalmente eliminar la tabla de categorías
DROP TABLE IF EXISTS public.categories CASCADE;

DROP TABLE IF EXISTS public.accounting_entries CASCADE;


-- Eliminar la tabla de relación entre empresas y usuarios
DROP TABLE IF EXISTS public.companies_users CASCADE;

-- Eliminar la tabla de empresas
DROP TABLE IF EXISTS public.companies CASCADE;


-- Eliminar la tabla branches (sucursales) y los índices asociados
DROP INDEX IF EXISTS idx_company_rtn_branches;
DROP INDEX IF EXISTS idx_is_active;
DROP TABLE IF EXISTS public.branches CASCADE;

-- Eliminar la tabla companies (empresas)
DROP TABLE IF EXISTS public.companies CASCADE;

DROP VIEW IF EXISTS view_customers_by_user;


DROP INDEX IF EXISTS idx_created_at_accounting_entries;

-- Eliminar índice de la tabla companies
DROP INDEX IF EXISTS idx_companies_rtn;
   
DROP TABLE IF EXISTS public.payment_plans CASCADE;

-- Eliminar el índice para el campo 'customer_id'
DROP INDEX IF EXISTS idx_customer_id;

-- Eliminar el índice para el campo 'company_rtn'
DROP INDEX IF EXISTS idx_company_rtn;

-- Eliminar el índice compuesto para 'customer_id' y 'company_rtn'
DROP INDEX IF EXISTS idx_customer_id_company_rtn;

-- Eliminar el índice para 'created_at'
DROP INDEX IF EXISTS idx_created_at_customer_companies;


   -- Eliminar la tabla de clientes (si existiera)
DROP TABLE IF EXISTS public.customers CASCADE;

-- Eliminar índices de la tabla customers
DROP INDEX IF EXISTS idx_rtn;
DROP INDEX IF EXISTS idx_full_name;

-- Eliminar la tabla customer_companies
DROP TABLE IF EXISTS public.customer_companies CASCADE;

DROP FUNCTION IF EXISTS insert_company(
    INTEGER, CHAR(14), VARCHAR(255), TEXT, VARCHAR(255), TEXT[], VARCHAR(255), INT
);

DROP FUNCTION IF EXISTS update_company(
    INTEGER, CHAR(14), VARCHAR(255), TEXT, VARCHAR(255), TEXT[], VARCHAR(255), INT
);


-- Eliminar índices para la tabla 'invoices'
DROP INDEX IF EXISTS idx_invoice_number;
DROP INDEX IF EXISTS idx_product_code1;
DROP INDEX IF EXISTS idx_company_rtn;
DROP INDEX IF EXISTS idx_customer_id;
DROP INDEX IF EXISTS idx_status;
DROP INDEX IF EXISTS idx_created_at;
DROP INDEX IF EXISTS idx_invoice_number_company_rtn;
DROP INDEX IF EXISTS idx_invoice_number_company_rtn_created_at;

-- Eliminar índices para la tabla 'invoice_details'
DROP INDEX IF EXISTS idx_invoice_id;
DROP INDEX IF EXISTS idx_product_id;
DROP INDEX IF EXISTS idx_invoice_id_product_code;
DROP INDEX IF EXISTS idx_invoice_id_product_code_created_at;


-- Eliminar índices de la tabla de devoluciones de productos (product_returns)
DROP INDEX IF EXISTS idx_product_return_number;
DROP INDEX IF EXISTS idx_invoice_id_product_returns;
DROP INDEX IF EXISTS idx_created_at_product_returns;
DROP INDEX IF EXISTS idx_invoice_id_status_created_at_product_returns;

-- Eliminar índices de la tabla de detalles de devoluciones de productos (product_return_details)
DROP INDEX IF EXISTS idx_product_return_id;
DROP INDEX IF EXISTS idx_product_id_product_return_details;
DROP INDEX IF EXISTS idx_product_return_id_product_id;
DROP INDEX IF EXISTS idx_product_return_id_product_id_created_at;

-- Eliminar la tabla de detalles de devoluciones de productos
DROP TABLE IF EXISTS public.product_return_details;

-- Eliminar la tabla de devoluciones de productos
DROP TABLE IF EXISTS public.product_returns;



-- Eliminar los índices de la tabla de cotizaciones
DROP INDEX IF EXISTS idx_quotation_number;
DROP INDEX IF EXISTS idx_product_code;
DROP INDEX IF EXISTS idx_quotation_number_product_code;
DROP INDEX IF EXISTS idx_created_at_quotation_details;

-- Eliminar la tabla de cotizaciones
DROP TABLE IF EXISTS public.quotation_details;





DROP INDEX IF EXISTS public.idx_account_code_accounting_entries;

-- Eliminar los índices asociados a la tabla 'chart_of_accounts'
DROP INDEX IF EXISTS public.idx_account_code;
DROP INDEX IF EXISTS public.idx_account_type;
DROP INDEX IF EXISTS public.idx_account_code_type;

-- Eliminar la tabla 'chart_of_accounts'
DROP TABLE IF EXISTS public.chart_of_accounts CASCADE;



-- Eliminar índices
DROP INDEX IF EXISTS public.idx_debit_account_code;
DROP INDEX IF EXISTS public.idx_credit_account_code;
DROP INDEX IF EXISTS public.idx_created_at;
DROP INDEX IF EXISTS public.idx_debit_credit_created_at;
DROP INDEX IF EXISTS public.idx_debit_created_at;
DROP INDEX IF EXISTS public.idx_credit_created_at;
-- Eliminar la tabla
DROP TABLE IF EXISTS public.accounting_adjustments CASCADE;





-- Eliminar tabla de configuraciones de facturación
DROP TABLE IF EXISTS public.invoice_configurations CASCADE;
DROP TABLE IF EXISTS public.invoices CASCADE;
DROP TABLE IF EXISTS public.invoice_details CASCADE;

-- Eliminar tabla de mensajes de error
DROP TABLE IF EXISTS public.error_messages;




DROP TABLE IF EXISTS public.company_payments CASCADE;





DROP INDEX IF EXISTS public.idx_company_payments_rtn,
                  public.idx_company_payments_plan_id,
                  public.idx_company_payments_created_at,
                  public.idx_company_payments_rtn_plan_created_at,
                  public.idx_company_payments_rtn_plan,
                  public.idx_company_payments_rtn_created_at;


DROP TABLE IF EXISTS public.api_calls CASCADE;
DROP TABLE IF EXISTS public.api_call_details CASCADE;









-- Crear la tabla de roles
CREATE TABLE public.up_roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);


CREATE OR REPLACE VIEW VUPROL AS
SELECT 
    id, 
    name AS rol, 
    description AS rol_desc, 
    type AS rol_type, 
    created_at, 
    updated_at, 
    created_by_user_id, 
    updated_by_user_id, 
    user_type
FROM public.up_roles;


-- Crear la tabla de permisos
CREATE TABLE public.up_permissions (
    id SERIAL PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    properties JSONB,
    conditions JSONB,
    role_id INTEGER REFERENCES public.up_roles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);

CREATE OR REPLACE VIEW public.VUPRM AS
SELECT action, properties, conditions, role_id as role from up_permissions;

-- Crear la tabla de usuarios
CREATE TABLE public.up_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    reset_password_token VARCHAR(255),
    confirmation_token VARCHAR(255),
    confirmed BOOLEAN DEFAULT FALSE,
    blocked BOOLEAN DEFAULT FALSE,
    role_id INTEGER REFERENCES public.up_roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);





















CREATE OR REPLACE FUNCTION public.get_user_credentials(
    p_email VARCHAR(255)
) RETURNS TABLE(userId INTEGER, pass VARCHAR, usrname VARCHAR, urole INTEGER, errorCode VARCHAR) AS $$
BEGIN
    -- Inicializamos las variables
    userId := NULL;
    errorCode := 'USR01'; -- Por defecto, si no se encuentra el usuario, devolvemos 'USR01'
	urole := NULL;
    -- Comprobamos si se pasó un email y una contraseña
    IF p_email IS NOT NULL THEN
        -- Buscamos al usuario por email y password
        SELECT id, password, username, role_id, 
               CASE
                   WHEN blocked = TRUE THEN 'USR02' 
                   WHEN confirmed = FALSE THEN 'USR03'
                   ELSE '0000' 
               END AS error_code
        INTO userId, pass, usrname, urole, errorCode
        FROM public.up_users
        WHERE email = p_email;

        -- Si no se encuentra el usuario, se establece el código de error USR01
        IF userId IS NULL THEN
            errorCode := 'USR01';  -- Si no se encontró el usuario, devolvemos 'USR01'
        END IF;

    ELSE
        RAISE EXCEPTION 'Se debe proporcionar el email';
    END IF;

    -- Retornamos una sola fila con el id del usuario y el código de error
    RETURN QUERY SELECT userId, pass, usrname, urole, errorCode;
END;
$$ LANGUAGE plpgsql;


-- Crear la tabla de tokens para autenticación
CREATE TABLE public.up_users_tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES public.up_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);

-- Crear la tabla de administradores de Strapi
CREATE TABLE public.strapi_administrator (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    reset_password_token VARCHAR(255),
    registration_token VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    roles JSONB,  -- Strapi almacena múltiples roles en JSONB
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);

-- Crear la tabla de roles de administradores de Strapi
CREATE TABLE public.strapi_admin_roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    code VARCHAR(255) UNIQUE NOT NULL,  -- Código interno del rol
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);

-- Crear la tabla de enlaces entre administradores y roles
CREATE TABLE public.strapi_admin_roles_links (
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES public.strapi_admin_roles(id) ON DELETE CASCADE,
    admin_id INTEGER REFERENCES public.strapi_administrator(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);

-- Crear la tabla de permisos de administradores de Strapi
CREATE TABLE public.strapi_admin_permissions (
    id SERIAL PRIMARY KEY,
    action VARCHAR(255) NOT NULL,  -- Ejemplo: "plugin::content-manager.explorer.read"
    subject VARCHAR(255),  -- Tabla o entidad sobre la que aplica el permiso
    properties JSONB,  -- Configuración extra de permisos
    conditions JSONB,  -- Condiciones adicionales
    role_id INTEGER REFERENCES public.strapi_admin_roles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);





-- Vista para strapi_administrator
CREATE OR REPLACE VIEW VUSADM AS
SELECT id, firstname as u_fname, lastname as u_lname, email as u_ema, username as u_user, is_active as u_status, roles as u_rol, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type
FROM public.strapi_administrator;

-- Vista para strapi_admin_roles
CREATE OR REPLACE VIEW VUSROL AS
SELECT id, name as rol, description as rol_name, code as rol_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type
FROM public.strapi_admin_roles;

-- Vista para strapi_admin_roles_links
CREATE OR REPLACE VIEW VUSRLI AS
SELECT id, role_id, admin_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type
FROM public.strapi_admin_roles_links;

-- Vista para strapi_admin_permissions
CREATE OR REPLACE VIEW VUSPER AS
SELECT id, action as p_act, subject as p_sub, properties as p_props, conditions as p_con, role_id as p_rol, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type
FROM public.strapi_admin_permissions;





















-- Procedimiento para insertar en strapi_administrator
CREATE OR REPLACE FUNCTION insert_strapi_administrator(
    _a TEXT, _b TEXT, _c TEXT, _d TEXT, _e TEXT, _f TEXT, _g TEXT, _h TEXT, _i BOOLEAN, _j JSONB, _k INTEGER, _l INTEGER, _m TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.strapi_administrator (firstname, lastname, email, username, password, reset_password_token, registration_token, is_active, roles, created_by_user_id, updated_by_user_id, user_type)
    VALUES (_a, _b, _c, _d, _e, _f, _g, _i, _j, _k, _l, _m);
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para insertar en strapi_admin_roles
CREATE OR REPLACE FUNCTION insert_strapi_admin_roles(
    _n TEXT, _o TEXT, _p TEXT, _q INTEGER, _r INTEGER, _s TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.strapi_admin_roles (name, description, code, created_by_user_id, updated_by_user_id, user_type)
    VALUES (_n, _o, _p, _q, _r, _s);
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para insertar en strapi_admin_roles_links
CREATE OR REPLACE FUNCTION insert_strapi_admin_roles_links(
    _t INTEGER, _u INTEGER, _v INTEGER, _w INTEGER, _x TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.strapi_admin_roles_links (role_id, admin_id, created_by_user_id, updated_by_user_id, user_type)
    VALUES (_t, _u, _v, _w, _x);
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para insertar en strapi_admin_permissions
CREATE OR REPLACE FUNCTION insert_strapi_admin_permissions(
    _y TEXT, _z TEXT, _aa JSONB, _ab JSONB, _ac INTEGER, _ad INTEGER, _ae TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.strapi_admin_permissions (action, subject, properties, conditions, role_id, created_by_user_id, updated_by_user_id, user_type)
    VALUES (_y, _z, _aa, _ab, _ac, _ad, _ae);
END;
$$ LANGUAGE plpgsql;




























-- Crear la tabla de bitácoras (auditoría)
CREATE TABLE public.audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(10) NOT NULL CHECK (action IN ('POST', 'PUT', 'DELETE', 'GET')),
    table_name VARCHAR(255) NOT NULL,  -- Nueva columna para almacenar el nombre de la tabla auditada
    description TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('ADMIN', 'USER')),
    created_at TIMESTAMP DEFAULT NOW()
);


-- Crear índices para mejorar las búsquedas
CREATE INDEX idx_up_users_email ON public.up_users(email);
CREATE INDEX idx_up_users_username ON public.up_users(username);
CREATE INDEX idx_up_permissions_role_id ON public.up_permissions(role_id);
CREATE INDEX idx_up_users_role_id ON public.up_users(role_id);
CREATE INDEX idx_audit_logs_id ON public.audit_logs(id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX idx_audit_logs_user_id_created_at ON public.audit_logs(user_id, created_at);
CREATE INDEX idx_audit_logs_id_created_at_table ON public.audit_logs(id, created_at, table_name);



-- Función para registrar auditoría
CREATE OR REPLACE FUNCTION audit_trigger_function() RETURNS TRIGGER AS $$
DECLARE
    description TEXT;
    col_name TEXT;
    old_value TEXT;
    new_value TEXT;
    change_details TEXT;
    user_id INTEGER;  -- Variable para almacenar el user_id
    user_type VARCHAR(10);  -- Variable para almacenar el tipo de usuario
 	
BEGIN
    -- Acción INSERT
    IF TG_OP = 'INSERT' THEN
        -- Asignar un valor predeterminado o de la sesión al user_id si no existe en la tabla
        user_id := COALESCE(NEW.created_by_user_id, 0);  -- Asigna un valor predeterminado si no está presente
        user_type := COALESCE(NEW.user_type, 'USER');  -- Asigna un valor predeterminado si no está presente
        description := '';
        FOR col_name IN
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = TG_TABLE_NAME
        LOOP
            EXECUTE format('SELECT $1.%I::TEXT', col_name) INTO new_value USING NEW;
            description := description || col_name || '=' || COALESCE(new_value, 'NULL') || ', ';
        END LOOP;
        INSERT INTO public.audit_logs (action, table_name, description, user_id, user_type, created_at)
        VALUES ('POST', TG_TABLE_NAME, description, user_id, user_type, NOW());
    
    -- Acción UPDATE
    ELSIF TG_OP = 'UPDATE' THEN
        user_id := COALESCE(NEW.updated_by_user_id, 0);
        user_type := COALESCE(NEW.user_type, 'USER');
        change_details := '';
        FOR col_name IN
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = TG_TABLE_NAME
        LOOP
            EXECUTE format('SELECT $1.%I::TEXT, $2.%I::TEXT', col_name, col_name) INTO old_value, new_value USING OLD, NEW;
            IF old_value IS DISTINCT FROM new_value THEN
                change_details := change_details || col_name || '=' || COALESCE(old_value, 'NULL') || ' -> ' || COALESCE(new_value, 'NULL') || ', ';
            END IF;
        END LOOP;
        INSERT INTO public.audit_logs (action, table_name, description, user_id, user_type, created_at)
        VALUES ('PUT', TG_TABLE_NAME, change_details, user_id, user_type, NOW());
    
    -- Acción DELETE
    ELSIF TG_OP = 'DELETE' THEN
        user_id := COALESCE(OLD.updated_by_user_id, 0);
        user_type := COALESCE(OLD.user_type, 'USER');
        description := '';
        FOR col_name IN
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = TG_TABLE_NAME
        LOOP
            EXECUTE format('SELECT $1.%I::TEXT', col_name) INTO old_value USING OLD;
            description := description || col_name || '=' || COALESCE(old_value, 'NULL') || ', ';
        END LOOP;
        INSERT INTO public.audit_logs (action, table_name, description, user_id, user_type, created_at)
        VALUES ('DELETE', TG_TABLE_NAME, description, user_id, user_type, NOW());
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Función para crear triggers dinámicos en todas las tablas
CREATE OR REPLACE FUNCTION create_audit_triggers() RETURNS VOID AS $$
DECLARE
    tbl RECORD;
	trigger_exists BOOLEAN;
BEGIN
    FOR tbl IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' AND table_name NOT IN ('audit_logs', 'api_calls', 'api_call_details') LOOP
         SELECT EXISTS (
            SELECT 1
            FROM information_schema.triggers
            WHERE event_object_table = tbl.table_name
            AND trigger_name = format('audit_%I', tbl.table_name)
        ) INTO trigger_exists;

		IF NOT trigger_exists THEN
			EXECUTE format('CREATE TRIGGER audit_%I AFTER INSERT OR UPDATE OR DELETE ON public.%I FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();', tbl.table_name, tbl.table_name);
    	END IF;
	END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Ejecutar la función para crear los triggers
SELECT create_audit_triggers();


;

--
---- Eliminar la acción para listar (list) registros de la tabla up_users
--DELETE FROM public.up_permissions
--WHERE action = 'api::users.users.list' AND subject = 'up_users';
--
--






CREATE VIEW public.VAULOG as --view audit logs
SELECT
    id,  -- ID del registro de auditoría
    action AS "act",  -- Acción realizada (POST, PUT, DELETE, GET)
    table_name AS "tbl_name",  -- Nombre de la tabla auditada
   description AS "desc",  -- Descripción del cambio
    user_id AS "usr_id",  -- ID del usuario que realizó la acción
    user_type AS "usr_tp",  -- Tipo de usuario (admin, user)
    created_at AS "crt_at"  -- Fecha y hora de creación del registro
FROM public.audit_logs order by id desc;







/*
*
*
*
*
*
*			PRIMERA PARTE TERMINADA [USUARIOS, ROLES Y PERMISOS]
*
*
*
*
*
*
*
*
*/






-- Tabla de categorías
CREATE TABLE public.categories (
    name VARCHAR(255) PRIMARY KEY,  -- Clave primaria
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INT NOT NULL,
    updated_by_user_id INT NOT NULL,
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL
);

-- Tabla de productos
-- Crear tabla de productos con código como clave primaria
CREATE TABLE public.products (
    code VARCHAR(50) PRIMARY KEY,  -- Código único como clave primaria
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    purchase_price DECIMAL(10,2) NOT NULL,  -- Precio de compra
    price DECIMAL(10,2) NOT NULL,  -- Precio de venta
    tax DECIMAL(5,2) NOT NULL DEFAULT 0,  -- Impuesto en porcentaje
    stock INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,  -- Estado del producto
    images TEXT[],  -- Array para almacenar múltiples imágenes
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INT NOT NULL,
    updated_by_user_id INT NOT NULL,
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL
);

-- Tabla intermedia para la relación muchos a muchos entre productos y categorías
CREATE TABLE public.product_categories (
    product_code VARCHAR(50) NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (product_code, category_name),
    FOREIGN KEY (product_code) REFERENCES public.products(code) ON DELETE CASCADE,
    FOREIGN KEY (category_name) REFERENCES public.categories(name) ON DELETE CASCADE
);

-- Índice para la tabla de categorías (ya que la clave primaria es name, se crea automáticamente, pero lo definimos explícitamente)
CREATE INDEX idx_categories_name ON public.categories(name);


-- Crear índice basado en el código (único) y el nombre
CREATE INDEX idx_products_code ON public.products (code);
CREATE INDEX idx_products_code_name ON public.products (code, name);







   
   /*
*
*
*
*
*
*			SEGUNDA PARTE TERMINADA [PRODUCTOS, CATEGORIAS]
*
*
*
*
*
*
*
*
*/
   

   CREATE TABLE public.payment_plans (
    id SERIAL PRIMARY KEY, -- Clave primaria autoincremental
    name VARCHAR(255) NOT NULL, -- Nombre del plan
    price DECIMAL(10,2) NOT NULL, -- Precio del plan
    included_items TEXT[], -- Un arreglo de cosas que incluye el plan
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) -- Tipo de usuario
);
   drop table companies;
CREATE TABLE public.companies (
    rtn CHAR(14) PRIMARY KEY, -- RTN como clave primaria
    name VARCHAR(255) NOT NULL,
    address TEXT,
    email VARCHAR(255),
    phones TEXT[], -- Un arreglo de teléfonos (pueden ser múltiples)
    owner_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE, -- Si la empresa está activa
    plan_id INT, -- Relación con la tabla de planes de pago
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER, -- id del usuario que creó el registro
    updated_by_user_id INTEGER, -- id del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')), -- Tipo de usuario
    FOREIGN KEY (plan_id) REFERENCES public.payment_plans(id), -- Relación con la tabla de planes de pago
    FOREIGN KEY (created_by_user_id) REFERENCES public.up_users(id), -- Relación con la tabla de usuarios
);


CREATE TABLE public.branches (
    id SERIAL PRIMARY KEY,  -- Identificador único para cada sucursal
    company_rtn CHAR(14) NOT NULL, -- RTN de la empresa (clave foránea)
    name VARCHAR(255) NOT NULL,  -- Nombre de la sucursal
    address TEXT,  -- Dirección de la sucursal
    email VARCHAR(255) DEFAULT 'NOEMAIL@NOEMAIL.COM',  -- Correo con valor por defecto
    phones TEXT[],  -- Lista de teléfonos
    owner_name VARCHAR(255),  -- Nombre del dueño
    is_active BOOLEAN DEFAULT TRUE,  -- Si la sucursal está activa
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')),  -- Tipo de usuario
    FOREIGN KEY (company_rtn) REFERENCES public.companies(rtn) ON DELETE CASCADE  -- Relación con la empresa
);


CREATE OR REPLACE FUNCTION insert_company(
    p_user_id INTEGER,
    p_rtn CHAR(14),
    p_name VARCHAR(255),
    p_address TEXT,
    p_email VARCHAR(255),
    p_phones TEXT[],
    p_owner_name VARCHAR(255),
    p_plan_id INT
) RETURNS TABLE (userId INTEGER,errorCode VARCHAR(5)) AS $$
DECLARE
    v_exists BOOLEAN;
    v_plan_exists BOOLEAN;
    v_user_exists BOOLEAN;
BEGIN
    -- Verificar si la empresa ya existe con ese RTN
    SELECT EXISTS(SELECT 1 FROM public.companies WHERE rtn = p_rtn) INTO v_exists;
    IF v_exists THEN
        RETURN QUERY SELECT p_user_id, 'COM01'::VARCHAR(5);
	ELSE
		-- Verificar si el plan_id existe
	    SELECT EXISTS(SELECT 1 FROM public.payment_plans WHERE id = p_plan_id) INTO v_plan_exists;
	    IF NOT v_plan_exists THEN
	        RETURN QUERY SELECT p_user_id, 'PLA01'::VARCHAR(5);
		ELSE
			-- Verificar si el user_id existe
		    SELECT EXISTS(SELECT 1 FROM public.up_users WHERE id = p_user_id) INTO v_user_exists;
		    IF NOT v_user_exists THEN
		        RETURN QUERY SELECT p_user_id, 'USR10'::VARCHAR(5);
			ELSE
				-- Verificar si el usuario existe en companies
			    SELECT EXISTS(SELECT 1 FROM public.companies WHERE created_by_user_id = p_user_id) INTO v_user_exists;
			    IF v_user_exists THEN
			        RETURN QUERY SELECT p_user_id, 'COM02'::VARCHAR(5);
				ELSE
					-- Insertar la nueva empresa
				    INSERT INTO public.companies (rtn, name, address, email, phones, owner_name, plan_id, created_by_user_id, updated_by_user_id)
				    VALUES (p_rtn, p_name, p_address, p_email, p_phones, p_owner_name, p_plan_id, p_user_id, p_user_id);
				
				    -- Devolver la empresa creada sin los campos excluidos
				    RETURN QUERY SELECT p_user_id, '0000'::VARCHAR(5);
		    	END IF;
		    END IF;
	    END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_company(
    p_user_id INTEGER,
    p_rtn CHAR(14),
    p_name VARCHAR(255),
    p_address TEXT,
    p_email VARCHAR(255),
    p_phones TEXT[],
    p_owner_name VARCHAR(255),
    p_plan_id INT
) RETURNS TABLE (userId INTEGER,errorCode VARCHAR(5)) AS $$
DECLARE
    v_exists BOOLEAN;
    v_plan_exists BOOLEAN;
    v_user_exists BOOLEAN;
BEGIN
    -- Verificar si la empresa ya existe con ese RTN
    SELECT EXISTS(SELECT 1 FROM public.companies WHERE rtn = p_rtn) INTO v_exists;
    IF NOT v_exists THEN
        RETURN QUERY SELECT p_user_id, 'COM03'::VARCHAR(5);
	ELSE
		-- Verificar si el plan_id existe
	    SELECT EXISTS(SELECT 1 FROM public.payment_plans WHERE id = p_plan_id) INTO v_plan_exists;
	    IF NOT v_plan_exists THEN
	        RETURN QUERY SELECT p_user_id, 'PLA01'::VARCHAR(5);
		ELSE
			-- Verificar si el user_id existe
		    SELECT EXISTS(SELECT 1 FROM public.up_users WHERE id = p_user_id) INTO v_user_exists;
		    IF NOT v_user_exists THEN
		        RETURN QUERY SELECT p_user_id, 'USR10'::VARCHAR(5);
			ELSE
				-- Verificar si el usuario pertenece a la empresa
			    SELECT EXISTS(SELECT 1 FROM public.companies WHERE created_by_user_id = p_user_id AND rtn = p_rtn) INTO v_user_exists;
			    IF NOT v_user_exists THEN
			        RETURN QUERY SELECT p_user_id, 'COM04'::VARCHAR(5);
				ELSE
					UPDATE public.companies
					SET 
					    name = COALESCE(p_name, name),
					    address = COALESCE(p_address, address),
					    email = COALESCE(p_email, email),
					    phones = CASE 
					                WHEN p_phones IS NULL OR p_phones = '{}' THEN phones
					                ELSE p_phones
					             END,
					    owner_name = COALESCE(p_owner_name, owner_name),
					    plan_id = COALESCE(p_plan_id, plan_id),
					    updated_by_user_id = p_user_id
					WHERE rtn = p_rtn AND created_by_user_id = p_user_id;

				    -- Devolver la empresa creada sin los campos excluidos
				    RETURN QUERY SELECT p_user_id, '0000'::VARCHAR(5);
		    	END IF;
		    END IF;
	    END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;







-- Crear índice para la relación entre la sucursal y la empresa (basado en el RTN)
CREATE INDEX idx_company_rtn_branches ON public.branches (company_rtn);

-- Crear índice para las sucursales activas
CREATE INDEX idx_is_active ON public.branches (is_active);



-- Índice para la tabla companies por RTN
CREATE INDEX idx_companies_rtn ON public.companies(rtn);

   

   
   
   
   
   
   /*
*
*
*
*
*
*			TERCERA PARTE TERMINADA [EMPRESAS, SUCURSALES, PLANES PAGO]
*
*
*
*
*
*
*
*
*/
   
	   

   -- Crear la tabla de clientes (customers)
CREATE TABLE public.customers (
    id SERIAL PRIMARY KEY,  -- ID autoincremental
    rtn CHAR(14),  -- RTN, 14 caracteres
    full_name VARCHAR(255) NOT NULL,  -- Nombre completo
    address TEXT,  -- Dirección
    phones TEXT[],  -- Teléfonos (arreglo de texto)
    additional_data JSONB,  -- Campo JSON para datos adicionales
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER'))  -- Tipo de usuario
);

-- Índice para el campo 'rtn'
CREATE INDEX idx_rtn ON public.customers(rtn);

-- Índice para el campo 'full_name' (solo si se realiza búsqueda con patrones como 'Carlos%' para aprovechar el índice)
CREATE INDEX idx_full_name ON public.customers(full_name);

   
   -- Crear tabla intermedia para asociar clientes con empresas (muchos a muchos)
CREATE TABLE public.customer_companies (
    customer_id INTEGER NOT NULL,  -- ID del cliente
    company_rtn CHAR(14) NOT NULL,  -- RTN de la empresa
        created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')),  -- Tipo de usuario
    PRIMARY KEY (customer_id, company_rtn),  -- Llave primaria compuesta
    FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE,
    FOREIGN KEY (company_rtn) REFERENCES public.companies(rtn) ON DELETE CASCADE
);

-- Índice para el campo 'customer_id' (para buscar asociaciones por cliente)
CREATE INDEX idx_customer_id ON public.customer_companies(customer_id);

-- Índice para el campo 'company_rtn' (para buscar asociaciones por empresa)
CREATE INDEX idx_company_rtn ON public.customer_companies(company_rtn);

-- Índice compuesto para 'customer_id' y 'company_rtn' (para buscar por cliente y empresa juntos)
CREATE INDEX idx_customer_id_company_rtn ON public.customer_companies(customer_id, company_rtn);

-- Índice para 'created_at' (si es necesario buscar por fecha de creación)
CREATE INDEX idx_created_at_customer_companies ON public.customer_companies(created_at);


create or REPLACE VIEW public.view_customers_by_user AS
SELECT 
    cu.id,
    cu.rtn AS customer_rtn,
    cu.full_name AS customer_name,
    cu.address AS customer_address,
    cu.phones AS customer_phones,
    cu.additional_data AS customer_additional_data,
    cu.created_at AS customer_created_at,
    cu.updated_at AS customer_updated_at,
    u.id AS user_id
FROM public.customers cu
JOIN public.customer_companies cc ON cu.id = cc.customer_id
JOIN public.companies co ON cc.company_rtn = co.rtn
JOIN public.companies_users cuu ON co.rtn = cuu.company_rtn
JOIN public.up_users u ON cuu.user_id = u.id;







-- Modificar la tabla de facturas para quitar el campo 'client_rtn' y agregar la relación con 'customer_companies'
CREATE TABLE public.invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL,  -- Número de la factura
    company_rtn CHAR(14) NOT NULL,  -- RTN de la empresa emisora
    customer_id INTEGER,  -- ID del cliente (referencia a la tabla customers)
    discount DECIMAL(10, 2) DEFAULT 0.00,  -- Descuento total de la factura
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,  -- Impuesto de la factura (15% por ejemplo)
    status VARCHAR(20) CHECK (status IN ('PENDING', 'PAID', 'CANCELLED')) NOT NULL,  -- Estado de la factura
    issue_date TIMESTAMP DEFAULT NOW(),  -- Fecha de emisión de la factura
    due_date TIMESTAMP,  -- Fecha de vencimiento de la factura
    total_amount DECIMAL(10, 2) DEFAULT 0.00,  -- Monto total de la factura (calculado por trigger)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by_user_id INTEGER NOT NULL,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER NOT NULL,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL,  -- Tipo de usuario
    FOREIGN KEY (company_rtn) REFERENCES public.companies(rtn) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL  -- Relación con cliente
);



-- Crear tabla de detalles de factura
CREATE TABLE public.invoice_details (
    id SERIAL PRIMARY KEY,  -- ID autoincremental
    invoice_id INTEGER NOT NULL,  -- ID de la factura
    product_code VARCHAR(255) NOT NULL,  -- Código del producto
    quantity INTEGER NOT NULL,  -- Cantidad del producto
    unit_price DECIMAL(10, 2) NOT NULL,  -- Precio unitario del producto
    total_price DECIMAL(10, 2) NOT NULL,  -- Precio total (quantity * unit_price)
    discount DECIMAL(10, 2) DEFAULT 0.00,  -- Descuento aplicado a ese producto
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')),  -- Tipo de usuario
    FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE CASCADE,  -- Relación con 'invoices'
    FOREIGN KEY (product_code) REFERENCES public.products(code) ON DELETE CASCADE  -- Relación con 'products' usando 'code'
);


-- Índice para 'invoice_id', para facilitar la búsqueda de todos los detalles de una factura
CREATE INDEX idx_invoice_id ON public.invoice_details(invoice_id);

-- Índice para 'product_code', para optimizar las búsquedas de detalles de factura por producto
CREATE INDEX idx_product_code1 ON public.invoice_details(product_code);

-- Índice compuesto para 'invoice_id' y 'product_code', útil para consultas que incluyan ambos campos
CREATE INDEX idx_invoice_id_product_code ON public.invoice_details(invoice_id, product_code);

-- Índice compuesto para 'invoice_id', 'product_code' y 'created_at', para optimizar las búsquedas por factura, producto y fecha de creación
CREATE INDEX idx_invoice_id_product_code_created_at ON public.invoice_details(invoice_id, product_code, created_at);




-- Tabla de devoluciones de productos (product_returns)
CREATE TABLE public.product_returns (
    id SERIAL PRIMARY KEY,  -- ID de la devolución
    invoice_id INT NOT NULL,  -- Relación con la factura original
    total_returned DECIMAL(10, 2) DEFAULT 0.00,  -- Monto total devuelto (valor por defecto 0.0)
    reason VARCHAR(255),  -- Razón de la devolución
    status VARCHAR(20) CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED')) NOT NULL,  -- Estado de la devolución
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de la devolución (usamos created_at para esta fecha)
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER NOT NULL,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER NOT NULL,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL,  -- Tipo de usuario
    FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE CASCADE
);

-- Tabla de detalles de devoluciones de productos (product_return_details)
CREATE TABLE public.product_return_details (
    id SERIAL PRIMARY KEY,  -- ID del detalle de la devolución
    return_id INT NOT NULL,  -- Relación con la devolución
    product_id VARCHAR(50) NOT NULL,  -- Código del producto devuelto
    quantity INT NOT NULL,  -- Cantidad de productos devueltos
    unit_price DECIMAL(10, 2) NOT NULL,  -- Precio unitario del producto devuelto
    total_price DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,  -- Total calculado para este detalle de devolución
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER NOT NULL,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER NOT NULL,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL,  -- Tipo de usuario
    FOREIGN KEY (return_id) REFERENCES public.product_returns(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES public.products(code) ON DELETE CASCADE
);

-- Índices para la tabla de devoluciones de productos (product_returns)
CREATE INDEX idx_invoice_id_product_returns ON public.product_returns(invoice_id);  -- Para buscar por la factura asociada
CREATE INDEX idx_created_at_product_returns ON public.product_returns(created_at);  -- Para buscar por la fecha de creación de la devolución
CREATE INDEX idx_invoice_id_status_created_at_product_returns ON public.product_returns(invoice_id, status, created_at);  -- Compuesta para factura, estado y fecha

-- Índices para la tabla de detalles de devoluciones de productos (product_return_details)
CREATE INDEX idx_product_return_id ON public.product_return_details(return_id);  -- Para buscar por la devolución asociada
CREATE INDEX idx_product_id_product_return_details ON public.product_return_details(product_id);  -- Para buscar por el producto devuelto
CREATE INDEX idx_product_return_id_product_id ON public.product_return_details(return_id, product_id);  -- Compuesta para búsqueda por devolución y producto
CREATE INDEX idx_product_return_id_product_id_created_at ON public.product_return_details(return_id, product_id, created_at);  -- Compuesta para búsqueda por devolución, producto y fecha





-- Crear la tabla de cotizaciones
CREATE TABLE public.quotation_details (
    quotation_number INT NOT NULL,  -- Número de cotización
    product_code VARCHAR(50) NOT NULL,  -- Código del producto cotizado
    price DECIMAL(10, 2) NOT NULL,  -- Precio del producto
    tax DECIMAL(10, 2) NOT NULL,  -- Impuesto aplicado
    discount DECIMAL(10, 2) NOT NULL,  -- Descuento aplicado
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación de la cotización
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER NOT NULL,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER NOT NULL,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL,  -- Tipo de usuario
    PRIMARY KEY (quotation_number, product_code)  -- Llave primaria compuesta por número de cotización y código de producto
);

-- Crear índices para la tabla de cotizaciones
CREATE INDEX idx_quotation_number ON public.quotation_details(quotation_number);  -- Para buscar por el número de cotización
CREATE INDEX idx_product_code ON public.quotation_details(product_code);  -- Para buscar por el código de producto
CREATE INDEX idx_quotation_number_product_code ON public.quotation_details(quotation_number, product_code);  -- Índice compuesto para búsqueda por número de cotización y código de producto
CREATE INDEX idx_created_at_quotation_details ON public.quotation_details(created_at);  -- Para buscar por la fecha de creación de la cotización






   /*
*
*
*
*
*
*			CUARTA PARTE TERMINADA [CLIENTES, FACTURAS, COTIZACIONES, DEVOLUCIONES]
*
*
*
*
*
*
*
*
*/



-- Crear la tabla de cuentas contables sin jerarquías, con tipo de cuenta como CHAR(3)
CREATE TABLE public.chart_of_accounts (
    id SERIAL PRIMARY KEY,  -- ID autoincremental
    account_code VARCHAR(20) UNIQUE NOT NULL,  -- Código de la cuenta contable (ej. 1-01-02)
    description VARCHAR(255) NOT NULL,  -- Descripción de la cuenta contable
    account_type CHAR(3) CHECK (account_type IN ('ACT', 'PAS', 'PAT', 'ING', 'EGS')) NOT NULL,  -- Tipo de cuenta (3 caracteres)
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL  -- Tipo de usuario (sin coma al final)
);


-- Crear un índice en account_code para búsquedas rápidas
CREATE INDEX idx_account_code ON public.chart_of_accounts(account_code);

-- Crear un índice en account_type para consultas por tipo de cuenta
CREATE INDEX idx_account_type ON public.chart_of_accounts(account_type);

-- Crear un índice compuesto para account_code y account_type
CREATE INDEX idx_account_code_type ON public.chart_of_accounts(account_code, account_type);




-- Crear tabla de ajustes contables sin 'adjustment_date' y con 'account_code' como clave foránea
CREATE TABLE public.accounting_adjustments (
    id SERIAL PRIMARY KEY,  -- ID autoincremental
    debit_account_code VARCHAR(20) NOT NULL,  -- Cuenta del Debe (usando account_code)
    credit_account_code VARCHAR(20) NOT NULL,  -- Cuenta del Haber (usando account_code)
    debit_amount DECIMAL(15, 2) NOT NULL,  -- Monto del Debe
    credit_amount DECIMAL(15, 2) NOT NULL,  -- Monto del Haber
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación (también representará la fecha del ajuste)
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el ajuste
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el ajuste
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT null,  -- Tipo de usuario
	FOREIGN KEY (debit_account_code) REFERENCES public.chart_of_accounts(account_code) ON DELETE CASCADE,  -- Relación con la cuenta del Debe
    FOREIGN KEY (credit_account_code) REFERENCES public.chart_of_accounts(account_code) ON DELETE CASCADE  -- Relación con la cuenta del Haber
);


-- Crear índices para optimizar las búsquedas por cuentas
CREATE INDEX idx_debit_account_code ON public.accounting_adjustments(debit_account_code);
CREATE INDEX idx_credit_account_code ON public.accounting_adjustments(credit_account_code);
CREATE INDEX idx_created_at ON public.accounting_adjustments(created_at);

-- Crear índice compuesto para debit_account_code, credit_account_code y created_at
CREATE INDEX idx_debit_credit_created_at ON public.accounting_adjustments(debit_account_code, credit_account_code, created_at);

-- Crear índice compuesto para debit_account_code y created_at
CREATE INDEX idx_debit_created_at ON public.accounting_adjustments(debit_account_code, created_at);

-- Crear índice compuesto para credit_account_code y created_at
CREATE INDEX idx_credit_created_at ON public.accounting_adjustments(credit_account_code, created_at);



-- Eliminar un ajuste contable específico (por ejemplo, con id = 1)
--DELETE FROM public.accounting_adjustments WHERE id = 1;




-- Crear tabla de configuraciones de facturación con 'company_id' como clave primaria
CREATE TABLE public.invoice_configurations (
    company_id CHAR(14) PRIMARY KEY,  -- RTN de la empresa como clave primaria
    start_range INTEGER NOT NULL,  -- Valor inicial del rango de facturación
    end_range INTEGER NOT NULL,  -- Valor final del rango de facturación
    cai VARCHAR(50) NOT NULL,  -- CAI de la factura (cadena de texto)
    invoice_type CHAR(1) CHECK (invoice_type IN ('1', '2', '3')) NOT NULL,  -- Tipo de factura
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL,  -- Tipo de usuario
    CHECK (end_range > start_range),  -- Asegura que el valor final sea mayor que el valor inicial
    FOREIGN KEY (company_id) REFERENCES public.companies(rtn) ON DELETE CASCADE  -- Relación con la empresa
);



-- Crear tabla de partidas contables
CREATE TABLE public.accounting_entries (
    id SERIAL PRIMARY KEY,  -- ID autoincremental
    account_code VARCHAR(20) NOT NULL,  -- Código de cuenta contable (debe existir en la tabla chart_of_accounts)
    debit_amount DECIMAL(15, 2) DEFAULT 0.00,  -- Monto en el Debe
    credit_amount DECIMAL(15, 2) DEFAULT 0.00, -- Monto en el Haber
    transaction_reference VARCHAR(100),  -- Referencia o descripción de la transacción
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación del registro (también representará la fecha de la transacción)
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización del registro
    created_by_user_id INTEGER,  -- ID del usuario que creó la partida
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó la partida
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL,  -- Tipo de usuario
    FOREIGN KEY (account_code) REFERENCES public.chart_of_accounts(account_code) ON DELETE CASCADE  -- Relación con la tabla de cuentas contables
);

-- Crear índices para optimizar las búsquedas por cuenta y fecha de creación
CREATE INDEX idx_account_code_accounting_entries ON public.accounting_entries(account_code);
CREATE INDEX idx_created_at_accounting_entries ON public.accounting_entries(created_at);



-- Crear tabla de mensajes de error
CREATE TABLE public.error_messages (
    error_code CHAR(5) PRIMARY KEY,  -- Código del mensaje de error (de longitud 5 caracteres)
    error_message TEXT NOT NULL,     -- Descripción del mensaje de error
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación del registro
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización del registro
    created_by_user_id INTEGER,      -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,      -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL  -- Tipo de usuario
);

-- Crear el procedimiento para obtener el mensaje de error basado en el código
CREATE OR REPLACE FUNCTION public.get_error_message(
    p_error_code CHAR(5)
) RETURNS TEXT AS $$
DECLARE
    v_error_message TEXT;
BEGIN
    -- Intentamos obtener el mensaje de error en base al código
    SELECT error_message
    INTO v_error_message
    FROM public.error_messages
    WHERE error_code = p_error_code;

    -- Si no se encuentra el código de error, asignamos el mensaje por defecto
    IF v_error_message IS NULL THEN
        v_error_message := 'Mensaje error no parametrizado';
    END IF;

    -- Retornamos el mensaje de error
    RETURN v_error_message;
END;
$$ LANGUAGE plpgsql;





DO $$ 
DECLARE
    i INTEGER;
BEGIN
    -- Ciclo para ejecutar la actualización 1000 veces
    FOR i IN 1..1000 LOOP
        UPDATE public.error_messages
        SET error_message = 'Error al procesar la solicitud. Intenta de nuevo más tarde.', 
            updated_by_user_id = 2, 
            user_type = 'ADMIN', 
            updated_at = now()
        WHERE error_code = 'ERR01';
    END LOOP;
END $$;


CREATE TABLE public.company_payments (
    id SERIAL PRIMARY KEY,  -- ID autoincremental
    rtn CHAR(14) NOT NULL,  -- RTN de la empresa (relacionado con la tabla companies)
    plan_id INT NOT NULL,  -- ID del plan de pago (relacionado con la tabla payment_plans)
    amount_paid DECIMAL(10, 2) NOT NULL,  -- Monto pagado
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')) NOT NULL,  -- Tipo de usuario
    FOREIGN KEY (rtn) REFERENCES public.companies(rtn) ON DELETE CASCADE,  -- Relación con la tabla companies
    FOREIGN KEY (plan_id) REFERENCES public.payment_plans(id) ON DELETE CASCADE  -- Relación con la tabla payment_plans
);


CREATE INDEX idx_company_payments_rtn ON public.company_payments (rtn);
CREATE INDEX idx_company_payments_plan_id ON public.company_payments (plan_id);
CREATE INDEX idx_company_payments_created_at ON public.company_payments (created_at);
CREATE INDEX idx_company_payments_rtn_plan_created_at ON public.company_payments (rtn, plan_id, created_at);
CREATE INDEX idx_company_payments_rtn_plan ON public.company_payments (rtn, plan_id);
CREATE INDEX idx_company_payments_rtn_created_at ON public.company_payments (rtn, created_at);




CREATE TABLE public.api_calls (
    reference_number SERIAL ,  -- Número de referencia autoincremental
    channel CHAR(1) NOT NULL CHECK (channel IN ('M', 'W')),  -- Canal ('M' para móvil, 'W' para web)
    created_at TIMESTAMP DEFAULT NOW(),  -- Fecha y hora de la llamada a la API
    ip_address INET,  -- Dirección IP desde donde se hizo la llamada
	endpoint TEXT,
	api_action VARCHAR(10) NOT NULL CHECK (api_action IN ('POST', 'PUT', 'DELETE', 'GET')),
    -- Campos estándar que agregas a todas las tablas
    updated_at TIMESTAMP DEFAULT NOW(),  -- Fecha de última actualización
    created_by_user_id INTEGER,  -- ID del usuario que creó el registro
    updated_by_user_id INTEGER,  -- ID del usuario que actualizó el registro
    user_type VARCHAR(10) CHECK (user_type IN ('ADMIN', 'USER')),  -- Tipo de usuario

    PRIMARY KEY (reference_number)  -- Clave primaria compuesta
);




CREATE TABLE public.api_call_details (
    id SERIAL PRIMARY KEY,  -- Identificador único
    api_call_reference SERIAL NOT NULL,  -- Referencia al número de la API call

    trama_1 TEXT,  -- Trama 1
    trama_2 TEXT,  -- Trama 2
    trama_3 TEXT,  -- Trama 3
    trama_4 TEXT,  -- Trama 4

    -- Relación con la tabla api_calls
    FOREIGN KEY (api_call_reference) 
        REFERENCES public.api_calls(reference_number) ON DELETE CASCADE
);



CREATE OR REPLACE FUNCTION insert_api_call(
    chn CHAR(1),               -- Canal (M o W)
    origin INET,               -- Dirección IP
    useri INT,                 -- ID del usuario
    uri TEXT,                  -- Endpoint
    u_type TEXT,               -- Tipo de usuario
    act TEXT                   -- Acción (POST, GET, etc.)
) RETURNS INTEGER AS $$ 
DECLARE
    new_reference INTEGER;
BEGIN
    INSERT INTO public.api_calls (
        channel, ip_address, endpoint, created_by_user_id, updated_by_user_id, user_type, api_action
    ) VALUES 
        (chn, origin, uri, useri, useri, u_type, act)
    RETURNING reference_number INTO new_reference;
    
    RETURN new_reference;
END;
$$ LANGUAGE plpgsql;
--
--SELECT insert_api_call(
--    'M'::CHAR,               -- Especificamos que es CHAR(1)
--    '192.168.1.100'::INET,   -- Especificamos que es INET
--    1::INTEGER,              -- Especificamos que es INTEGER
--    '/api/example'::TEXT,    -- Especificamos que es TEXT
--    'ADMIN'::TEXT,           -- Especificamos que es TEXT
--    'POST'::TEXT             -- Especificamos que es TEXT
--);



CREATE OR REPLACE FUNCTION insert_api_call_detail(
    asignref INT,
    p_trama_1 TEXT DEFAULT NULL,
    p_trama_2 TEXT DEFAULT NULL,
    p_trama_3 TEXT DEFAULT NULL,
    p_trama_4 TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.api_call_details (
        api_call_reference, trama_1, trama_2, trama_3, trama_4
    ) VALUES (
        asignref, p_trama_1, p_trama_2, p_trama_3, p_trama_4
    );
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION public.register_user(
    p_username VARCHAR(255),
    p_email VARCHAR(255),
    p_password VARCHAR(255),
    p_token VARCHAR(255),
    p_role_id INTEGER,
    p_created_by_user_id INTEGER,
    p_user_type VARCHAR(10)
) RETURNS TABLE(userId INTEGER, errorCode VARCHAR, suggestedUsername VARCHAR) AS $$
DECLARE
    v_role_exists BOOLEAN;
    v_email_exists BOOLEAN;
    v_username_exists BOOLEAN;
    v_suggested_username VARCHAR(255);
    v_count INTEGER;
BEGIN
    -- Inicializar valores de retorno
    userId := NULL;
    errorCode := NULL;
    suggestedUsername := NULL;

    -- Validar si el rol existe
    SELECT EXISTS(SELECT 1 FROM public.up_roles WHERE id = p_role_id) INTO v_role_exists;
    IF NOT v_role_exists THEN
        errorCode := 'USR06';
        RETURN QUERY SELECT userId, errorCode, suggestedUsername;
	ELSE
		-- Validar si el correo ya existe
	    SELECT EXISTS(SELECT 1 FROM public.up_users WHERE email = p_email) INTO v_email_exists;
	    IF v_email_exists THEN
	        errorCode := 'USR08';
	        RETURN QUERY SELECT userId, errorCode, suggestedUsername;
		ELSE
			 -- Validar si el username ya existe
		    SELECT EXISTS(SELECT 1 FROM public.up_users WHERE username = p_username) INTO v_username_exists;
		    IF v_username_exists THEN
		        -- Contar cuántos usernames similares existen
		        SELECT COUNT(*) INTO v_count FROM public.up_users WHERE username LIKE p_username || '%';
		
		        -- Generar username sugerido agregando el número siguiente
		        v_suggested_username := p_username || LPAD(CAST(v_count + 1 AS TEXT), 2, '0');
		
		        errorCode := 'USR07';
		        suggestedUsername := v_suggested_username;  -- Asignar el username sugerido
		        RETURN QUERY SELECT userId, errorCode, suggestedUsername; -- 🔹 Detener ejecución
			ELSE
				-- Si el username no existe, insertar usuario con el username original
			    INSERT INTO public.up_users (
			        username, email, password, role_id, created_by_user_id, user_type, confirmation_token
			    ) VALUES (
			        p_username, p_email, p_password, p_role_id, p_created_by_user_id, p_user_type, p_token
			    )
			    RETURNING id INTO userId;
			
			    -- Si se insertó correctamente, errorCode es '0000'
			    errorCode := '0000';
			    RETURN QUERY SELECT userId, errorCode, suggestedUsername;
		    END IF;
	    END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.confirm_user(
    p_email VARCHAR(255),
    p_token VARCHAR(255)
) RETURNS TABLE(userId INTEGER, errorCode VARCHAR) AS $$
DECLARE
    v_user_id INTEGER;
BEGIN
    -- Inicializar valores de retorno
    userId := NULL;
    errorCode := NULL;

    -- Verificar si el usuario con el email y token existe
    SELECT id INTO v_user_id
    FROM public.up_users
    WHERE email = p_email AND confirmation_token = p_token;

    -- Si no existe, devolver error
    IF v_user_id IS NULL THEN
        errorCode := 'USR09'; -- Usuario no encontrado o token incorrecto
        RETURN QUERY SELECT userId, errorCode;
	ELSE
		-- Actualizar el campo confirmed a true
	    UPDATE public.up_users
	    SET confirmed = TRUE, confirmation_token = NULL
	    WHERE id = v_user_id;
	
	    -- Devolver el ID del usuario y código de éxito
	    userId := v_user_id;
	    errorCode := '0000'; -- Éxito
	    RETURN QUERY SELECT userId, errorCode;
    END IF;

    
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.forgot_user(
    p_email VARCHAR(255),
    p_token VARCHAR(255)
) RETURNS TABLE(userId INTEGER, errorCode VARCHAR) AS $$
DECLARE
    v_user_id INTEGER;
	v_email_exists BOOLEAN;
BEGIN
    -- Inicializar valores de retorno
    userId := NULL;
    errorCode := NULL;

	-- Validar si el correo ya existe
    SELECT EXISTS(SELECT 1 FROM public.up_users WHERE email = p_email) INTO v_email_exists;
    IF NOT v_email_exists THEN
        errorCode := 'USR01';
        RETURN QUERY SELECT userId, errorCode;
	ELSE
		-- Actualizar el campo confirmed a true
	    UPDATE public.up_users
	    SET reset_password_token = p_token
	    WHERE email = p_email
		RETURNING id INTO userId;
	
	    -- Devolver el ID del usuario y código de éxito
	    errorCode := '0000'; -- Éxito
	    RETURN QUERY SELECT userId, errorCode;
	END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.reset_pass_user(
    p_email VARCHAR(255),
    p_pass VARCHAR(255)
) RETURNS TABLE(userId INTEGER, errorCode VARCHAR) AS $$
DECLARE
    v_user_id INTEGER;
	v_email_exists BOOLEAN;
BEGIN
    -- Inicializar valores de retorno
    userId := NULL;
    errorCode := NULL;

	-- Validar si el correo ya existe
    SELECT EXISTS(SELECT 1 FROM public.up_users WHERE email = p_email) INTO v_email_exists;
    IF NOT v_email_exists THEN
        errorCode := 'USR01';
        RETURN QUERY SELECT userId, errorCode;
	ELSE
		-- Actualizar el campo confirmed a true
	    UPDATE public.up_users
	    SET password = p_pass
	    WHERE email = p_email
		RETURNING id INTO userId;
	
	    -- Devolver el ID del usuario y código de éxito
	    errorCode := '0000'; -- Éxito
	    RETURN QUERY SELECT userId, errorCode;
	END IF;
END;
$$ LANGUAGE plpgsql;
----



--
--
--
--
--
--


--
--
--
--
--
--


--
--
--
--
--
--


--
--
--
--
--
--


--
--
--
--
--
--


--
--
--
--
--
--


--
--
--
--
--
--


--
--
--
--
--
--
--
--
--
--
--
--
-- Insertar un nuevo rol en la tabla up_roles
INSERT INTO public.up_roles (name, description, type, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('Administrador', 'Rol con permisos completos en el sistema', 'admin', NOW(), NOW(), 1, 1, 'ADMIN'),
('Usuario', 'Rol estándar con acceso limitado', 'user', NOW(), NOW(), 0, 0, 'USER');
--
--
--
--
--
---- Insertar permisos para la tabla up_users
--
---- Acción para leer (find) registros de la tabla up_users
--INSERT INTO public.up_permissions (action, subject, properties, conditions, role_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('api::users.users.find', 'up_users', '{}', '{}', 1, NOW(), NOW(), 1, 1, 'ADMIN');
--
---- Acción para crear (create) un nuevo registro en la tabla up_users
--INSERT INTO public.up_permissions (action, subject, properties, conditions, role_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('api::users.users.create', 'up_users', '{}', '{}', 1, NOW(), NOW(), 1, 1, 'ADMIN');
--
---- Acción para actualizar (update) un registro en la tabla up_users
--INSERT INTO public.up_permissions (action, subject, properties, conditions, role_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('api::users.users.update', 'up_users', '{}', '{}', 1, NOW(), NOW(), 1, 1, 'ADMIN');
--
---- Acción para eliminar (delete) un registro en la tabla up_users
--INSERT INTO public.up_permissions (action, subject, properties, conditions, role_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('api::users.users.delete', 'up_users', '{}', '{}', 1, NOW(), NOW(), 1, 1, 'ADMIN');
--
---- Acción para ver detalles (read) de un registro en la tabla up_users
--INSERT INTO public.up_permissions (action, subject, properties, conditions, role_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('api::users.users.read', 'up_users', '{}', '{}', 1, NOW(), NOW(), 1, 1, 'USER');
--
---- Acción para listar (list) registros de la tabla up_users
--INSERT INTO public.up_permissions (action, subject, properties, conditions, role_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('api::users.users.list', 'up_users', '{}', '{}', 1, NOW(), NOW(), 1, 1, 'USER');
--
---- Acción para exportar (export) registros de la tabla up_users
INSERT INTO public.up_permissions (action, subject, properties, conditions, role_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('api::/api/auditing::GET', 'auditing', '{"format": "csv"}', '{}', 1, NOW(), NOW(), 1, 1, 'USER');
--
--
--INSERT INTO public.categories (name, description, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES 
--    ('Electrónica', 'Dispositivos electrónicos y accesorios', NOW(), NOW(), 1, 1, 'ADMIN'),
--    ('Ropa', 'Vestimenta para hombres y mujeres', NOW(), NOW(), 2, 2, 'USER'),
--    ('Hogar', 'Artículos para el hogar y decoración', NOW(), NOW(), 3, 3, 'ADMIN'),
--    ('Deportes', 'Equipamiento y ropa deportiva', NOW(), NOW(), 4, 4, 'USER'),
--    ('Juguetes', 'Juguetes para todas las edades', NOW(), NOW(), 5, 5, 'ADMIN');
--
--
--
--INSERT INTO public.products (code, name, description, price, purchase_price, tax, stock, is_active, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES 
--    ('PROD001', 'Laptop Dell XPS', 'Laptop de alto rendimiento con pantalla 4K', 1500.00, 1200.00, 15.00, 10, TRUE, NOW(), NOW(), 1, 1, 'ADMIN'),
--    ('PROD002', 'Camiseta Nike', 'Camiseta deportiva de algodón', 30.00, 20.00, 5.00, 50, TRUE, NOW(), NOW(), 2, 2, 'USER'),
--    ('PROD003', 'Sofá de cuero', 'Sofá elegante con tapizado de cuero', 750.00, 500.00, 18.00, 5, TRUE, NOW(), NOW(), 3, 3, 'ADMIN'),
--    ('PROD004', 'Balón de fútbol', 'Balón oficial de la FIFA', 25.00, 15.00, 3.00, 100, TRUE, NOW(), NOW(), 4, 4, 'USER'),
--    ('PROD005', 'Muñeca Barbie', 'Muñeca edición especial de colección', 40.00, 25.00, 6.00, 30, TRUE, NOW(), NOW(), 5, 5, 'ADMIN');
--
--
--
--
---- Insert con la relación al plan de pago
--INSERT INTO public.companies (rtn, name, address, email, phones, owner_name, is_active, plan_id, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--    ('00000012345678', 'Empresa Ejemplo S.A.', 'Calle Ficticia 123, Ciudad', 'contacto@empresaejemplo.com', ARRAY['+50499999999', '+50488888888'], 'Juan Pérez', TRUE, 1, NOW(), NOW(), 1, 1, 'ADMIN'), -- Plan Developer (ID 1)
--    ('00000023456789', 'Comercial XYZ', 'Avenida Principal 456, Ciudad', 'info@comercialxyz.com', ARRAY['+50497777777'], 'María Gómez', TRUE, 2, NOW(), NOW(), 2, 2, 'USER'); -- Plan Pro (ID 2)
--
--
--
---- Insertar sucursales para las empresas
--INSERT INTO public.branches (company_rtn, name, address, email, phones, owner_name, is_active, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--    ('00000012345678', 'Sucursal Ejemplo S.A. Centro', 'Avenida Central 123, Ciudad', 'contacto@ejemplo.com', ARRAY['+50499999999'], 'Juan Pérez', TRUE, NOW(), NOW(), 1, 1, 'ADMIN'),
--    ('00000012345678', 'Sucursal Ejemplo S.A. Norte', 'Avenida Norte 456, Ciudad', 'noemail@noemail.com', ARRAY['+50498888888'], 'Juan Pérez', TRUE, NOW(), NOW(), 1, 1, 'ADMIN'),
--    ('00000023456789', 'Sucursal Comercial XYZ Este', 'Avenida Este 789, Ciudad', 'noemail@noemail.com', ARRAY['+50497777777'], 'María Gómez', TRUE, NOW(), NOW(), 2, 2, 'USER'),
--    ('00000023456789', 'Sucursal Comercial XYZ Sur', 'Avenida Sur 101, Ciudad', 'noemail@noemail.com', ARRAY['+50496666666'], 'María Gómez', TRUE, NOW(), NOW(), 2, 2, 'USER');
--
--   
--   
   INSERT INTO public.payment_plans (name, price, included_items, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
    ('Plan Developer', 15.00, ARRAY['1 seat', '1 GB storage', '1 GB bandwidth'], NOW(), NOW(), 1, 1, 'ADMIN'),
    ('Plan Pro', 99.00, ARRAY['5 seats', '5 GB storage', '5 GB bandwidth'], NOW(), NOW(), 2, 2, 'USER'),
    ('Plan Team', 499.00, ARRAY['10 seats', '20 GB storage', '20 GB bandwidth'], NOW(), NOW(), 3, 3, 'ADMIN');

--   
--
---- Insertar clientes (customers) con datos de ejemplo
--INSERT INTO public.customers (rtn, full_name, address, phones, additional_data, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--    ('00000012345678', 'Carlos López', 'Calle Ficticia 123, Ciudad', ARRAY['+50499999999', '+50488888888'], '{"birthdate": "1985-05-10", "gender": "M"}', NOW(), NOW(), 1, 1, 'ADMIN'),
--    ('00000023456789', 'Ana Martínez', 'Avenida Principal 456, Ciudad', ARRAY['+50497777777'], '{"birthdate": "1990-08-15", "gender": "F"}', NOW(), NOW(), 2, 2, 'USER'),
--    ('00000034567890', 'Luis García', 'Calle Secundaria 789, Ciudad', ARRAY['+50497654321'], '{"birthdate": "1975-11-20", "gender": "M", "membership": "Gold"}', NOW(), NOW(), 1, 1, 'ADMIN');
--
--
--
---- Insertar una asociación entre cliente y empresa
--INSERT INTO public.customer_companies (
--    customer_id,
--    company_rtn,
--    created_at,
--    updated_at,
--    created_by_user_id,
--    updated_by_user_id,
--    user_type
--) VALUES
--    (1, '00000012345678', NOW(), NOW(), 1, 1, 'ADMIN'),
--    (2, '00000023456789', NOW(), NOW(), 2, 2, 'USER');
--
--   
---- Insertar una nueva factura
--INSERT INTO public.invoices (
--    invoice_number,
--    company_rtn,
--    customer_id,  -- Nuevo campo para el cliente
--    discount,
--    tax_amount,
--    status,
--    issue_date,
--    due_date,
--    total_amount,
--    created_by_user_id,
--    updated_by_user_id,
--    user_type
--) VALUES (
--    'F123456',
--    '00000012345678',  -- RTN de la empresa emisora
--    1,  -- ID del cliente en la tabla customers (por ejemplo, 1)
--    10.00,
--    0.00,  -- Impuesto
--    'PENDING',
--    NOW(),
--    '2025-12-31',
--    1000.00,
--    1,
--    1,
--    'USER'
--);
--
--
--
---- Insertar detalles de factura con datos de ejemplo
--INSERT INTO public.invoice_details (
--    invoice_id,
--    product_code,
--    quantity,
--    unit_price,
--    total_price,
--    discount,
--    created_at,
--    updated_at,
--    created_by_user_id,
--    updated_by_user_id,
--    user_type
--) VALUES
--    (1, 'PROD001', 2, 500.00, 1000.00, 50.00, NOW(), NOW(), 1, 1, 'ADMIN'),
--    (1, 'PROD002', 1, 300.00, 300.00, 0.00, NOW(), NOW(), 1, 1, 'ADMIN');
--
--
--
---- Insertar una nueva devolución de producto
--INSERT INTO public.product_returns (
--    invoice_id,
--    total_returned,
--    reason,
--    status,
--    created_by_user_id,
--    updated_by_user_id,
--    user_type
--) VALUES (
--    3,  -- ID de la factura relacionada
--    100.00,  -- Total devuelto
--    'Producto defectuoso',  -- Razón de la devolución
--    'PENDING',  -- Estado inicial
--    1,  -- ID del usuario que creó el registro
--    1,  -- ID del usuario que actualizó el registro
--    'USER'  -- Tipo de usuario
--);
--
--
--
---- Insertar una cotización
--INSERT INTO public.quotation_details (
--    quotation_number,
--    product_code,
--    price,
--    tax,
--    discount,
--    created_by_user_id,
--    updated_by_user_id,
--    user_type
--) VALUES (
--    1234,  -- Número de cotización
--    'P12345',  -- Código del producto
--    200.00,  -- Precio del producto
--    20.00,  -- Impuesto aplicado
--    10.00,  -- Descuento aplicado
--    1,  -- ID del usuario que creó el registro
--    1,  -- ID del usuario que actualizó el registro
--    'USER'  -- Tipo de usuario
--);
--
--
--
---- Insertar cuentas contables en la tabla 'chart_of_accounts'
--
---- Cuentas de Activo
--INSERT INTO public.chart_of_accounts (account_code, description, account_type, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('100', 'Caja', 'ACT', NOW(), NOW(), 1, 1, 'ADMIN'),
--('101', 'Bancos', 'ACT', NOW(), NOW(), 1, 1, 'ADMIN'),
--('102', 'Cuentas por cobrar', 'ACT', NOW(), NOW(), 1, 1, 'ADMIN'),
--('103', 'Inventarios', 'ACT', NOW(), NOW(), 1, 1, 'ADMIN'),
--('104', 'Propiedades, planta y equipo', 'ACT', NOW(), NOW(), 1, 1, 'ADMIN'),
--('105', 'Otros activos', 'ACT', NOW(), NOW(), 1, 1, 'ADMIN');
--
---- Cuentas de Pasivo
--INSERT INTO public.chart_of_accounts (account_code, description, account_type, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('200', 'Cuentas por pagar', 'PAS', NOW(), NOW(), 1, 1, 'ADMIN'),
--('201', 'Préstamos a corto plazo', 'PAS', NOW(), NOW(), 1, 1, 'ADMIN'),
--('202', 'Préstamos a largo plazo', 'PAS', NOW(), NOW(), 1, 1, 'ADMIN'),
--('203', 'Acreedores varios', 'PAS', NOW(), NOW(), 1, 1, 'ADMIN');
--
---- Cuentas de Patrimonio
--INSERT INTO public.chart_of_accounts (account_code, description, account_type, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('300', 'Capital social', 'PAT', NOW(), NOW(), 1, 1, 'ADMIN'),
--('301', 'Reservas', 'PAT', NOW(), NOW(), 1, 1, 'ADMIN'),
--('302', 'Utilidades retenidas', 'PAT', NOW(), NOW(), 1, 1, 'ADMIN');
--
---- Cuentas de Ingresos
--INSERT INTO public.chart_of_accounts (account_code, description, account_type, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('400', 'Ventas', 'ING', NOW(), NOW(), 1, 1, 'ADMIN'),
--('401', 'Otros ingresos', 'ING', NOW(), NOW(), 1, 1, 'ADMIN');
--
---- Cuentas de Egresos
--INSERT INTO public.chart_of_accounts (account_code, description, account_type, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('500', 'Costo de ventas', 'EGS', NOW(), NOW(), 1, 1, 'ADMIN'),
--('501', 'Gastos de administración', 'EGS', NOW(), NOW(), 1, 1, 'ADMIN'),
--('502', 'Gastos de ventas', 'EGS', NOW(), NOW(), 1, 1, 'ADMIN'),
--('503', 'Otros egresos', 'EGS', NOW(), NOW(), 1, 1, 'ADMIN');
--
--
---- Insertar ajustes contables basados en las cuentas de la tabla 'chart_of_accounts'
--INSERT INTO public.accounting_adjustments (
--    debit_account_code, 
--    credit_account_code, 
--    debit_amount, 
--    credit_amount, 
--    created_at, 
--    updated_at, 
--    created_by_user_id, 
--    updated_by_user_id, 
--    user_type
--)
--VALUES
--    ('300', '400', 1000.00, 1000.00, NOW(), NOW(), 1, 1, 'ADMIN'),  -- Ajuste entre Capital social (debe) y Ventas (haber)
--    ('301', '401', 500.00, 500.00, NOW(), NOW(), 2, 2, 'USER'),      -- Ajuste entre Reservas (debe) y Otros ingresos (haber)
--    ('302', '500', 300.00, 300.00, NOW(), NOW(), 3, 3, 'ADMIN'),      -- Ajuste entre Utilidades retenidas (debe) y Costo de ventas (haber)
--    ('500', '503', 200.00, 200.00, NOW(), NOW(), 1, 1, 'ADMIN');      -- Ajuste entre Costo de ventas (debe) y Otros egresos (haber)
--
--
--
---- Insertar configuración de facturación para una empresa
--INSERT INTO public.invoice_configurations (
--    company_id, 
--    start_range, 
--    end_range, 
--    cai, 
--    invoice_type, 
--    created_at, 
--    updated_at, 
--    created_by_user_id, 
--    updated_by_user_id, 
--    user_type
--)
--VALUES 
--(
--    '00000012345678', -- RTN de la empresa
--    1000,              -- Valor inicial del rango de facturación
--    2000,              -- Valor final del rango de facturación
--    'CAI123456789',    -- CAI de la factura
--    '1',               -- Tipo de factura
--    NOW(),             -- Fecha de creación
--    NOW(),             -- Fecha de actualización
--    1,                 -- ID del usuario que creó el registro
--    1,                 -- ID del usuario que actualizó el registro
--    'ADMIN'            -- Tipo de usuario
--);
--
--
--
---- Insertar registros en la tabla de accounting_entries
--INSERT INTO public.accounting_entries (account_code, debit_amount, credit_amount, transaction_reference, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--('100', 1500.00, 0.00, 'Pago realizado en efectivo', NOW(), NOW(), 1, 1, 'ADMIN'),
--('101', 0.00, 1500.00, 'Pago realizado desde la cuenta bancaria', NOW(), NOW(), 1, 1, 'ADMIN'),
--('102', 3000.00, 0.00, 'Venta a crédito', NOW(), NOW(), 1, 1, 'ADMIN'),
--('200', 0.00, 3000.00, 'Pago a proveedores', NOW(), NOW(), 1, 1, 'ADMIN'),
--('300', 0.00, 5000.00, 'Capital social recibido', NOW(), NOW(), 1, 1, 'ADMIN'),
--('500', 5000.00, 0.00, 'Costo de ventas', NOW(), NOW(), 1, 1, 'ADMIN'),
--('401', 0.00, 5000.00, 'Ingreso por venta de productos', NOW(), NOW(), 1, 1, 'ADMIN');
--
--

-- Insertar mensajes de error
INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('0000', 'Operación realizada exitosamente.', NOW(), NOW(), 1, 1, 'ADMIN'),
('ERR01', 'Error al procesar la solicitud. Intenta de nuevo más tarde.', NOW(), NOW(), 1, 1, 'ADMIN'),
('ERR02', 'Usuario no encontrado. Verifique las credenciales.', NOW(), NOW(), 1, 1, 'ADMIN'),
('ERR03', 'No se pudo conectar con la base de datos. Contacte al administrador.', NOW(), NOW(), 1, 1, 'ADMIN'),
('ERR04', 'Acceso denegado. No tiene permisos suficientes para realizar esta acción.', NOW(), NOW(), 1, 1, 'ADMIN'),
('ERR05', 'El valor ingresado no es válido. Por favor, verifique los datos.', NOW(), NOW(), 1, 1, 'ADMIN');
INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('USR06', 'El rol ingresado no existe.', NOW(), NOW(), 1, 1, 'ADMIN'),
('USR07', 'El username ya está siendo utilizado por otro usuario.', NOW(), NOW(), 1, 1, 'ADMIN');

INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('USR08', 'El email ya está siendo utilizado por otro usuario.', NOW(), NOW(), 1, 1, 'ADMIN');

INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('USR01', 'Credenciales inválidas', NOW(), NOW(), 0, 0, 'ADMIN');


INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('USR02', 'El usuario está bloqueado', NOW(), NOW(), 0, 0, 'ADMIN'),
('USR03', 'El usuario no está confirmado aún', NOW(), NOW(), 0, 0, 'ADMIN');

INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('USR09', 'El enlace de confirmación no es válido o ha expirado.', NOW(), NOW(), 0, 0, 'ADMIN');


INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('COM01', 'El RTN ya está siendo utilizado por otra empresa.', NOW(), NOW(), 0, 0, 'ADMIN'),
('USR10', 'El usuario no existe.', NOW(), NOW(), 0, 0, 'ADMIN'),
('PLA01', 'Plan inválido.', NOW(), NOW(), 0, 0, 'ADMIN');


INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('COM02', 'El usuario ya tiene asignada una empresa.', NOW(), NOW(), 0, 0, 'ADMIN');

INSERT INTO public.error_messages (error_code, error_message, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
VALUES
('COM03', 'La empresa no existe.', NOW(), NOW(), 0, 0, 'ADMIN'),
('COM04', 'El usuario no válido.', NOW(), NOW(), 0, 0, 'ADMIN');

INSERT INTO public.up_permissions (
    action, 
    role_id, 
    created_by_user_id, 
    updated_by_user_id, 
    user_type
) 
VALUES (
    'API::/api/users/permissions-all::GET', 
    1, 
    1,  -- Suponiendo que el id del usuario que crea y actualiza es 1
    1,  -- Suponiendo que el id del usuario que crea y actualiza es 1
    'ADMIN'  -- Asumiendo que el tipo de usuario es 'ADMIN'
);

INSERT INTO public.up_permissions (
    action, 
    role_id, 
    created_by_user_id, 
    updated_by_user_id, 
    user_type
) 
VALUES (
    'API::/api/customers::GET', 
    1, 
    1,  -- Suponiendo que el id del usuario que crea y actualiza es 1
    1,  -- Suponiendo que el id del usuario que crea y actualiza es 1
    'ADMIN'  -- Asumiendo que el tipo de usuario es 'ADMIN'
);



--
---- Insertar pagos realizados por las empresas, considerando el plan y el monto pagado
--INSERT INTO public.company_payments (rtn, plan_id, amount_paid, created_at, updated_at, created_by_user_id, updated_by_user_id, user_type)
--VALUES
--    ('00000012345678', 1, 15.00, NOW(), NOW(), 1, 1, 'ADMIN'),  -- Empresa Ejemplo S.A. paga por el Plan Developer
--    ('00000023456789', 2, 99.00, NOW(), NOW(), 2, 2, 'USER');  -- Comercial XYZ paga por el Plan Pro
--
--
--
--
--INSERT INTO public.api_calls (
--    channel, created_at, ip_address, updated_at, 
--    created_by_user_id, updated_by_user_id, user_type
--) VALUES 
--    ('M', NOW(), '192.168.1.10', NOW(), 1, 1, 'ADMIN'), 
--    ('W', NOW(), '203.0.113.5', NOW(), 2, 2, 'USER'), 
--    ('M', NOW(), '198.51.100.25', NOW(), 3, 3, 'ADMIN'), 
--    ('W', NOW(), '172.16.0.2', NOW(), 4, 4, 'USER');
--
--
--
--
--
---- Suponiendo que los valores retornados son 1 y 2, insertar en api_call_details
--INSERT INTO public.api_call_details (api_call_reference, trama_1, trama_2, trama_3, trama_4)
--VALUES 
--    (1, 'Datos de trama 1', 'Datos de trama 2', 'Datos de trama 3', 'Datos de trama 4'),
--    (2, 'Otra trama 1', 'Otra trama 2', 'Otra trama 3', 'Otra trama 4');
--
--
--
--
--
--SELECT insert_api_call('M', '192.168.1.10'::INET, '/api', 1, 'ADMIN', 'POST');
--
--
--SELECT create_audit_triggers();
--
--
--select * from audit_logs limit 1000 offset 100 -- order by id desc;
--
--
--SELECT public.get_error_message('0300');
--
--UPDATE public.up_users
--SET confirmed = TRUE, updated_at = NOW()
--WHERE email = 'user@user.com';
--
--UPDATE public.up_users
--SET blocked = FALSE, updated_at = NOW()
--WHERE email = 'user@user.com';
--
--SELECT public.get_user_credentials('user@user.com');
--
--
--SELECT * 
--FROM api_call_details
--WHERE api_call_reference = (
--  SELECT api_calls.reference_number 
--  FROM api_calls
--  ORDER BY created_at DESC
--  LIMIT 1
--);
--
--
--
--
----
----select * from public.confirm_user('adiaz@soteica.net', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhZGlhekBzb3RlaWNhLm5ldHxhZGlhejAxIiwiaWF0IjoxNzQyMTAzOTYyLCJleHAiOjE3NDIxMTgzNjJ9.up4F2AHW6HF_YTlqC0U7oqPGJwQcLx54v9p27Bxbo6U');
----select * from up_users;
----
----
----SELECT * FROM public.register_user(
----    'nuevo_usuario2',      -- Username
----    'nuevo1@email.com',    -- Email
----    'hashed_password',    -- Contraseña (debe estar encriptada con bcrypt desde la app)
----    100,                    -- ID del rol (asegúrate de que exista en up_roles)
----    1,                    -- ID del usuario que lo creó
----    'USER'                -- Tipo de usuario ('ADMIN' o 'USER')
----);
----
----select * from public.forgot_user('adiaz@soteica.net', 'hdavsbdiasduasuasbdaibs');
----
----select * from error_messages;
----
----select * from up_users;
----
----delete from up_users;
--
--
--
--
--
--
--
--
--
--
--
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
--
--
--
--
--
--
---- Actualizar la acción para exportar (export) registros de la tabla up_users
--UPDATE public.up_permissions
--SET properties = '{"format": ["csv", "xls"]}', updated_at = NOW(), updated_by_user_id = 1
--WHERE action = 'api::users.users.export' AND subject = 'up_users';
--
--
--
--
--
--   
--  -- Update con la relación al plan de pago
--UPDATE public.companies
--SET 
--    name = 'Empresa Ejemplo S.A. Modificada',
--    address = 'Calle Ficticia 123, Ciudad Modificada',
--    email = 'nuevoemail@empresaejemplo.com',
--    phones = ARRAY['+50499999999', '+50488888888', '+50477777777'],  -- Se agrega un nuevo número
--    owner_name = 'Juan Pérez Actualizado',
--    is_active = FALSE,  -- Cambiar estado a inactivo
--    plan_id = 3, -- Cambiar al Plan Team (ID 3)
--    updated_at = NOW(),  -- Actualizar fecha de modificación
--    updated_by_user_id = 1,  -- ID del usuario que actualiza
--    user_type = 'USER'  -- Cambiar tipo de usuario
--WHERE rtn = '00000012345678';
--
--
--   
---- Actualizar un cliente con nuevos datos
--UPDATE public.customers
--SET 
--    full_name = 'Carlos López Modificado',
--    address = 'Calle Ficticia 123, Ciudad Modificada',
--    phones = ARRAY['+50499999999', '+50488888888', '+50477777777'],  -- Se agrega un nuevo número
--    additional_data = '{"birthdate": "1985-05-10", "gender": "M", "membership": "Silver"}',  -- Se agrega nuevo dato
--    updated_at = NOW(),  -- Actualizar fecha de modificación
--    updated_by_user_id = 1  -- ID del usuario que actualiza
--WHERE rtn = '00000012345678';
--
--   -- Actualizar la fecha de actualización y el usuario para una asociación existente
--UPDATE public.customer_companies
--SET 
--    updated_at = NOW(),
--    updated_by_user_id = 1,  -- ID del usuario que actualiza
--    user_type = 'ADMIN'  -- Nuevo tipo de usuario (si es necesario)
--WHERE customer_id = 1 AND company_rtn = '00000012345678';
--
--
--
--
---- Actualizar el estado y la fecha de vencimiento de una factura
--UPDATE public.invoices
--SET 
--    status = 'PAID',
--    due_date = '2025-11-30',
--    updated_at = NOW(),
--    updated_by_user_id = 2,
--    customer_id = 2  -- Si es necesario actualizar el cliente asignado
--WHERE id = 1;
--
--
--
--
--
---- Actualizar el estado de una devolución de producto
--UPDATE public.product_returns
--SET 
--    status = 'COMPLETED',
--    updated_at = NOW(),
--    updated_by_user_id = 2
--WHERE id = 1;
--
--
--
---- Actualizar precio y descuento de una cotización específica
--UPDATE public.quotation_details
--SET 
--    price = 120.00,  -- Nuevo precio
--    discount = 10.00,  -- Nuevo descuento
--    updated_at = NOW(),  -- Fecha de actualización
--    updated_by_user_id = 2  -- ID del usuario que actualizó
--WHERE quotation_number = 1234  -- Número de cotización
--  AND product_code = 'P12345';  -- Código de producto
--
--
--
---- Actualizar la descripción de una cuenta de Activo
--UPDATE public.chart_of_accounts
--SET description = 'Caja y Bancos'
--WHERE account_code = '100';
--
--
--
--
--
---- Actualizar configuración de facturación para una empresa
--UPDATE public.invoice_configurations
--SET 
--    start_range = 2000,    -- Nuevo valor inicial del rango de facturación
--    end_range = 3000,      -- Nuevo valor final del rango de facturación
--    cai = 'CAI987654321',  -- Nuevo CAI de la factura
--    invoice_type = '2',    -- Nuevo tipo de factura
--    updated_at = NOW(),    -- Fecha de actualización
--    updated_by_user_id = 2, -- ID del usuario que actualizó el registro
--    user_type = 'USER'     -- Tipo de usuario actualizado
--WHERE company_id = '00000012345678'; -- RTN de la empresa a actualizar
--
--
---- Actualizar los mensajes de error según los códigos proporcionados
--UPDATE public.error_messages
--SET error_message = 'Error al procesar la solicitud. Intenta de nuevo más tarde.', updated_by_user_id=2, user_type ='ADMIN', updated_at = now() 
--WHERE error_code = 'ERR01';
--
--
--
---- Actualizar el monto pagado y la fecha de actualización para una empresa
--UPDATE public.company_payments
--SET 
--    amount_paid = 120.00,  -- Nuevo monto pagado
--    updated_at = NOW(),    -- Fecha de actualización
--    updated_by_user_id = 1,  -- Usuario que realiza la actualización
--    user_type = 'ADMIN'     -- Tipo de usuario que realiza la actualización
--WHERE 
--    rtn = '00000012345678' AND  -- Filtrar por el RTN de la empresa
--    plan_id = 1;               -- Filtrar por el ID del plan de pago
--
--
--
