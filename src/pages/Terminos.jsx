import { useNavigate } from 'react-router-dom'

function Terminos() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', color: '#c9a84c', border: '1px solid #c9a84c', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginBottom: '2rem' }}>
          ← Volver
        </button>

        <h1 style={{ color: '#c9a84c', marginBottom: '0.5rem' }}>Términos y Condiciones</h1>
        <p style={{ color: '#aaaaaa', marginBottom: '2rem' }}>Última actualización: junio 2026</p>

        {[
          {
            titulo: '1. Aceptación de los Términos',
            texto: 'Al acceder y utilizar AromaStore, usted acepta quedar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio. AromaStore se reserva el derecho de modificar estos términos en cualquier momento.'
          },
          {
            titulo: '2. Uso del Servicio',
            texto: 'AromaStore es una plataforma de comercio electrónico especializada en perfumes premium. El usuario se compromete a utilizar el servicio únicamente para fines lícitos y de manera que no infrinja los derechos de terceros. Está prohibido el uso del servicio para actividades fraudulentas o ilegales.'
          },
          {
            titulo: '3. Registro de Cuenta',
            texto: 'Para realizar compras en AromaStore, el usuario debe crear una cuenta proporcionando información veraz y actualizada. El usuario es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta.'
          },
          {
            titulo: '4. Productos y Precios',
            texto: 'Todos los productos ofrecidos en AromaStore son perfumes 100% originales y auténticos. Los precios están expresados en dólares estadounidenses e incluyen impuestos. AromaStore se reserva el derecho de modificar los precios sin previo aviso.'
          },
          {
            titulo: '5. Proceso de Compra',
            texto: 'Al confirmar un pedido, el usuario acepta pagar el precio indicado. AromaStore procesará el pedido una vez confirmado el pago. El usuario recibirá una notificación por correo electrónico con los detalles de su compra.'
          },
          {
            titulo: '6. Envíos y Entregas',
            texto: 'AromaStore realiza envíos a todo el país en un plazo de 24 a 48 horas hábiles. Los gastos de envío serán informados al momento de confirmar el pedido. AromaStore no se hace responsable por retrasos causados por factores externos.'
          },
          {
            titulo: '7. Devoluciones y Reembolsos',
            texto: 'El usuario tiene derecho a devolver productos dentro de los 7 días siguientes a la recepción, siempre que estén en perfectas condiciones y sin abrir. Los reembolsos se procesarán dentro de los 10 días hábiles siguientes a la recepción del producto devuelto.'
          },
          {
            titulo: '8. Privacidad y Datos',
            texto: 'AromaStore recopila y procesa datos personales de acuerdo con su Política de Privacidad. Los datos del usuario serán utilizados únicamente para gestionar pedidos y mejorar la experiencia de compra. No compartiremos sus datos con terceros sin su consentimiento.'
          },
          {
            titulo: '9. Propiedad Intelectual',
            texto: 'Todo el contenido de AromaStore, incluyendo imágenes, textos, logos y diseños, es propiedad de AromaStore y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción sin autorización expresa.'
          },
          {
            titulo: '10. Contacto',
            texto: 'Para cualquier consulta relacionada con estos términos, puede contactarnos a través de nuestro correo electrónico: contacto@aromastore.com o mediante nuestros canales de atención al cliente disponibles en el sitio web.'
          }
        ].map((seccion, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#c9a84c', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              {seccion.titulo}
            </h2>
            <p style={{ color: '#cccccc', lineHeight: '1.7' }}>{seccion.texto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Terminos
