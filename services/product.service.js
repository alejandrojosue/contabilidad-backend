/* eslint-disable camelcase */
import { pool } from '../database/config.js'
// import { REST } from '../config/api.js'
export const create = async ({ body, user }) => {
  const _user = user?.user ?? 0
  const _uType = user?.uType ?? 'USER'
  // eslint-disable-next-line
 const { code, name, description, price, purchase_price, tax, stock, images, category_id } = body;

  // eslint-disable-next-line no-useless-catch
  try {
    const result = await pool.query('SELECT * FROM public.insert_product($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        code,
        name,
        description,
        price,
        purchase_price,
        tax,
        stock,
        images,
        category_id,
        _user,
        _uType
      ]
    )

    const { errorcode, prodcode } = result.rows[0]

    // eslint-disable-next-line
    if (errorcode !== '0000') throw { status: 400, code: errorcode }

    return {
      code: prodcode,
      name,
      description,
      price,
      purchase_price,
      tax,
      stock,
      images,
      category_id,
      _user,
      _uType,
      is_active: true
    }
  } catch (error) {
    // eslint-disable-next-line
   throw { status: error.status ?? 500, code: error.code }
  }
}
