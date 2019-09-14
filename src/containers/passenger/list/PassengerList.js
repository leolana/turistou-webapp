import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Tag, Modal, Form, InputNumber, Row, Col, Select, Skeleton } from 'antd'
import { paymentType } from 'constants/options'

import { tableData, statuses, statusesCode, statusesEnum } from 'mock/passengers'
import { tableData as customersList } from 'mock/customers'
import CustomerSelect from 'components/CustomerSelect/CustomerSelect'

class PassengerList extends Component {
  constructor() {
    super()
    this.filterData = this.filterData.bind(this)
    this.columnsForStatus = this.columnsForStatus.bind(this)
    this.handleRemove = this.handleRemove.bind(this)

    const passengersList = tableData.map(x => {
      const paymentPercentual = x.paid / x.total
      if (paymentPercentual === 1) x.paidColor = 'text-success'
      else if (paymentPercentual > 0.5) x.paidColor = 'text-warning'
      else x.paidColor = 'text-danger'

      return x
    })
    this.state = {
      passengersList,
      paymentValue: 0,
      isLoading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1500)
  }

  exchange = id => {
    console.log('id', id)
    // TODO: replace passenger
  }

  book = id => {
    console.log('id', id)
    // TODO: move
  }

  remove = id => {
    console.log('delete', id)
    // TODO: exclude...

    const { passengersList } = this.state
    const udPassengersList = passengersList.filter(x => x.id !== id)
    this.setState({ passengersList: udPassengersList })
  }

  update = id => {
    const { paymentValue } = this.state
    console.log('update: ', id, paymentValue)
  }

  handleRemove(id) {
    Modal.error({
      title: 'Removendo o passageiro da excursão',
      width: 700,
      content: (
        <Row>
          <Col md={12}>
            <Form>
              {/* <Form.Item label="Motivo da desistência">
                <Input size="default" maxLength={150} />
              </Form.Item> */}
              <Form.Item label="Valor devolvido">
                <InputNumber size="default" min={0} />
              </Form.Item>
            </Form>
          </Col>
          <Col md={12} className="pt-3 pl-5">
            <div>
              Valor pago: <span className="float-right font-weight-bold">R$ 1000,00</span>
            </div>
            <div>
              Valor devolvido:{' '}
              <span className="float-right font-weight-bold text-danger">R$ 400,00</span>
            </div>
            <div>
              Valor em caixa: <span className="float-right font-weight-bold">R$ 600,00</span>
            </div>
          </Col>
        </Row>
      ),
      okCancel: true,
      cancelText: 'Cancelar',
      okText: 'Remover',
      okType: 'danger',
      onOk: () => this.remove(id),
    })
  }

  handleHistory(id) {
    const fake = [
      {
        id: 1,
        date: new Date(2019, 5, 12),
        value: 100,
        paymentWay: 'Dinheiro',
        paymentStatus: { paid: true, auto: false },
      },
      {
        id: 2,
        date: new Date(2019, 6, 12),
        value: 100,
        paymentWay: 'Cartão de crédito',
        paymentStatus: { paid: true, auto: true },
      },
      {
        id: 3,
        date: new Date(2019, 7, 12),
        value: 100,
        paymentWay: 'Cartão de crédito',
        paymentStatus: { paid: false, auto: true },
      },
      {
        id: 4,
        date: new Date(2019, 8, 12),
        value: 100,
        paymentWay: 'Boleto',
        paymentStatus: { paid: true, auto: false },
      },
      {
        id: 5,
        date: new Date(2019, 9, 12),
        value: 100,
        paymentWay: 'Boleto',
        paymentStatus: { paid: false, auto: false },
      },
    ]
    const columns = [
      {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
        render: x => x && new Date(x).toLocaleDateString(),
      },
      {
        title: 'Valor',
        dataIndex: 'value',
        key: 'value',
        className: 'text-right',
        render: x => `R$ ${x}`,
      },
      {
        title: 'Forma de pagamento',
        dataIndex: 'paymentWay',
        key: 'paymentWay',
      },
      {
        title: 'Situação',
        dataIndex: 'paymentstatus',
        key: 'status',
        render: (_, row) => {
          console.log('row', row)
          const { paymentStatus } = row
          let text = paymentStatus.paid ? 'Pago' : 'A pagar'
          if (paymentStatus.auto) text += ' (automático)'

          return (
            <span>
              {text}
              {/* TODO: ajustar link */}
              {!paymentStatus.paid && !paymentStatus.auto && <Button type="link">Pagou</Button>}
            </span>
          )
        },
      },
    ]

    Modal.info({
      title: 'Datas de pagamento',
      width: 700,
      okCancel: true,
      cancelText: 'OK',
      okText: 'Atualizar',
      onOk: () => {
        this.updatePayment(id)
      },
      content: (
        <Table
          id={`payment_${id}`}
          rowKey="id"
          className="utils__scrollTable"
          scroll={{ x: '100%' }}
          columns={columns}
          dataSource={fake}
          pagination={false}
        />
      ),
    })
  }

  handleUpdate(id) {
    const { paymentValue } = this.state

    const paid = 500
    const total = paid + paymentValue

    Modal.error({
      title: 'Atualizar pagamento',
      width: 700,
      okCancel: true,
      cancelText: 'Cancelar',
      okText: 'Atualizar',
      onOk: () => this.update(id),
      content: (
        <Row>
          <Col sm={12}>
            <Form>
              <Form.Item label="Valor do pagamento">
                <InputNumber
                  onChange={value => {
                    this.setState({ paymentValue: value })
                  }}
                />
              </Form.Item>
              <Form.Item label="Forma de pagamento">
                <Select size="default">
                  {paymentType.map(x => (
                    <Select.Option key={x.value} value={x.value} title={x.label}>
                      {x.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col sm={12} className="pl-4">
            <div>
              Valor pago anteriormente: <span>{paid}</span>
            </div>
            <div>
              Total pago: <span>{total}</span>
            </div>
            <div>
              Valor faltante: <span>{total}</span>
            </div>
          </Col>
        </Row>
      ),
    })
  }

  handleBook(id) {
    Modal.confirm({
      okCancel: true,
      cancelText: 'Não',
      okText: 'Sim',
      title: 'Confirmar reserva',
      content: 'Deseja confirmar o passageiro à excursão?',
      onOk: () => this.book(id),
    })
  }

  handleExchange(id) {
    Modal.confirm({
      title: 'Troca de passageiro',
      okCancel: true,
      cancelText: 'Cancelar',
      okText: 'Trocar',
      onOk: () => {
        this.exchange(id)
      },
      content: (
        <div>
          <p>Trocar passageiro atual pelo(a)</p>
          <CustomerSelect customers={customersList} />
        </div>
      ),
    })
  }

  renderActionsButtons = (id, statusId) => {
    const buttonsAction = {
      booked: (
        <div className="table-action-buttons">
          <Button
            ghost
            size="small"
            type="primary"
            title="Atualizar pagamento"
            onClick={() => {
              this.handleUpdate(id)
            }}
          >
            <i className="fa fa-dollar" />
          </Button>
          <Button
            ghost
            size="small"
            type="primary"
            title="Histórico de pagamento"
            onClick={() => {
              this.handleHistory(id)
            }}
          >
            <i className="fa fa-calendar" />
          </Button>
          <Button
            ghost
            size="small"
            type="primary"
            title="Trocar passageiro"
            onClick={() => {
              this.handleExchange(id)
            }}
          >
            <i className="fa fa-exchange" />
          </Button>
          <Button
            ghost
            size="small"
            type="danger"
            title="Passageiro desistiu"
            onClick={() => this.handleRemove(id)}
          >
            <i className="fa fa-times" />
          </Button>
        </div>
      ),
      waiting: (
        <div className="table-action-buttons">
          <Button
            ghost
            size="small"
            type="primary"
            title="Reservar passageiro"
            onClick={() => {
              this.handleBook(id)
            }}
          >
            <i className="fa fa-check" />
          </Button>
          <Button
            ghost
            size="small"
            type="danger"
            title="Remover passageiro"
            onClick={() => this.handleRemove(id)}
          >
            <i className="fa fa-times" />
          </Button>
        </div>
      ),
      canceled: (
        <div className="table-action-buttons">
          <Button
            ghost
            size="small"
            type="primary"
            title="Reservar passageiro"
            onClick={() => {
              this.handleBook(id)
            }}
          >
            <i className="fa fa-check" />
          </Button>
        </div>
      ),
    }
    return buttonsAction[statusesEnum[statusId]]
  }

  filterData() {
    const { statusId, query, startPay, fullPay } = this.props
    const { passengersList } = this.state
    let filteredData = passengersList

    if (statusId) filteredData = filteredData.filter(x => x.status === statusId)
    if (fullPay) filteredData = filteredData.filter(x => x.paid === x.total)
    else if (startPay) filteredData = filteredData.filter(x => x.paid > 0)
    if (query)
      filteredData = filteredData.filter(x => {
        const queryPart = query.toLowerCase().split(' ')
        return queryPart.every(q => x.customer.name.toLowerCase().includes(q))
      })

    return filteredData
  }

  columnsForStatus() {
    const { statusId } = this.props
    const allColumns = {
      actions: {
        dataIndex: 'id',
        key: 'id',
        render: id => this.renderActionsButtons(id, statusId),
      },
      status: {
        title: 'Situação',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
        render: () => {
          const { description, type } = statuses.find(s => s.id === statusId)
          return <Tag className={`text-white bg-${type} mr-0`}>{description}</Tag>
        },
      },
      name: {
        title: 'Nome',
        dataIndex: 'customer.name',
        key: 'name',
      },
      telephone: {
        title: 'Telefone',
        dataIndex: 'customer.telephone',
        key: 'telephone',
      },
      reimbursedValue: {
        title: 'Valor devolvido',
        dataIndex: 'reimbursedValue',
        key: 'reimbursedValue',
        render: value => <span>R$ {value}</span>,
      },
      value: {
        title: 'Valor pago / Valor total',
        dataIndex: 'value',
        key: 'value',
        className: 'text-center',
        render: (_, row) => {
          if (row.status !== statusesCode.waiting)
            return (
              <span className={row.paidColor}>
                R$ {row.paid} / R$ {row.total}
              </span>
            )
          return ''
        },
      },
      ticketType: {
        title: 'Tipo de passagem',
        dataIndex: 'ticketPrice.description',
        key: 'ticketType',
      },
      spot: {
        title: 'Poltrona',
        dataIndex: 'spot',
        key: 'spot',
      },
    }

    switch (statusId) {
      case statusesCode.booked:
        return [
          allColumns.actions,
          allColumns.name,
          allColumns.value,
          allColumns.ticketType,
          allColumns.spot,
        ]
      case statusesCode.waiting:
        return [allColumns.actions, allColumns.name, allColumns.telephone]
      case statusesCode.canceled:
        return [allColumns.actions, allColumns.name, allColumns.reimbursedValue]
      default:
        return [allColumns.status, allColumns.name]
    }
  }

  render() {
    const { isLoading } = this.state
    const tableColumns = this.columnsForStatus()

    const filteredData = this.filterData()

    return (
      <Skeleton loading={isLoading}>
        <Table
          rowKey="id"
          className="utils__scrollTable"
          scroll={{ x: '100%' }}
          columns={tableColumns}
          dataSource={filteredData}
          pagination={false}
        />
      </Skeleton>
    )
  }
}

// const mapStateToProps = ({ passenger: {
//   isLoading,
//   payloadList,
//   filter,
// } }) => ({
//   isLoading,
//   payloadList,
//   filter,
// })

const mapStateToProps = state => {
  const { statusId, startPay, fullPay, query } = state.passenger
  return { statusId, startPay, fullPay, query }
}

export default connect(mapStateToProps)(PassengerList)
