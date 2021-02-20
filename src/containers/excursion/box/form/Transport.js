import React, { useMemo } from 'react'
import { Row, Col, Input, Button, Select, InputNumber } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

const availableTransports = [
  {
    id: 'BUS',
    name: 'Ônibus',
  },
  {
    id: 'MICRO_BUS',
    name: 'Micro-ônibus',
  },
  {
    id: 'DOUBLE_DECK_BUS',
    name: 'Ônibus double-deck',
  },
  {
    id: 'VAN',
    name: 'Van',
  },
  {
    id: 'TRAIN',
    name: 'Trêm',
  },
  {
    id: 'CAR',
    name: 'Carro',
  },
  {
    id: 'AIRPLANE',
    name: 'Avião',
  },
]

const Transport = ({ form, removeTransport, data }) => {
  const { key, id, capacity, plate, type, drivers } = data
  const index = key - 1
  const isEditable = useMemo(() => !id, [id])

  // FIXME: unblock transports edition when fix it in api
  form.getFieldDecorator(`transports[${index}].id`, { initialValue: id })
  return (
    <Row>
      <Col xs={24} sm={7}>
        <FormItem label="Tipo de transporte">
          {form.getFieldDecorator(`transports[${index}].type`, {
            initialValue: type,
            rules: [{ required: true, message: 'Por favor, escolha o tipo de transporte' }],
          })(
            <Select
              showSearch
              disabled={!isEditable}
              filterOption={(query, option) =>
                query
                  .toLowerCase()
                  .split(' ')
                  .every((x) => option.props.children.toLowerCase().includes(x))
              }
            >
              {availableTransports.map((x, availableTransportsIndex) => (
                <Select.Option
                  key={availableTransportsIndex.toString()}
                  value={x.id}
                  disabled={!isEditable}
                >
                  {x.name}
                </Select.Option>
              ))}
            </Select>,
          )}
        </FormItem>
      </Col>
      <Col xs={24} sm={4}>
        <FormItem label="Placa">
          {form.getFieldDecorator(`transports[${key}].plate`, {
            initialValue: plate,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={30} disabled={!isEditable} />)}
        </FormItem>
      </Col>
      <Col xs={20} sm={3} md={4}>
        <FormItem label="Capacidade">
          {form.getFieldDecorator(`transports[${key}].capacity`, {
            initialValue: capacity,
            rules: [{ required: false }],
          })(<InputNumber size="default" maxLength={3} disabled={!isEditable} />)}
        </FormItem>
      </Col>
      <Col xs={24} sm={6}>
        <FormItem label="Motorista" help="Separe os nomes com ';' (ponto-e-vírgula)">
          {form.getFieldDecorator(`transports[${key}].driver`, {
            initialValue: drivers && drivers.map((x) => x.name).join(' ; '),
            rules: [{ required: false }],
          })(<Input size="default" maxLength={30} disabled={!isEditable} />)}
        </FormItem>
      </Col>
      <Col xs={4} sm={3} md={2}>
        <Button
          type="danger"
          className="button-side-field float-right"
          onClick={() => removeTransport(key)}
        >
          <i className="fa fa-trash" />
        </Button>
      </Col>
    </Row>
  )
}
export default Transport
