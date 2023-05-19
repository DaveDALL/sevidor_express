# Servidor con EXPRESS (método GET)

Se crea servidor en express. Al momento solo resuelve peticiones GET, de acuerdo a los siguiente:

1. Solicitando todos los productos despues de url colocar **/products**. Se envia un obejto con todos productos existentes
2. Solicitando productos a través de un limite mediante **/products?limit=[cantidad de productos solicitados]**. En caso de que el limite se mayor a la cantidad de productos, se enviaran todos productos existentes. En caso de que se coloque una cantidad menor o igual a cero se envia un *objeto de error indicandoq ue el limite es menor o igual a cero*.
3. Solicitando un producto a través de su ID mediante **/productos/[ID del producto]**. Si se identifica el producto,s e resuleve con el producto con el ID correspondiente. En caso contrario se envía un *objeto de error con el mesaje indicando que el ID de producto solicitado no existe*.

NOTA: En la busqueda de productos por ID, dado que la implementación de la **clase productManager**, al momento de hacer un registro de productos usando esta clase, los ID de productos se generan automaticamente; el archivo de productos **products.json**, cuenta con los ID de acuerdo a esta implemnetación.