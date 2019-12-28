import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Tag, Modal, Form, InputNumber, Row, Col, Select, Table } from 'antd'
import { paymentType } from 'constants/options'
import paymentMethods from 'constants/paymentMethods'

import { statuses, statusesCode, statusesEnum } from 'mock/passengers'
import passengerActions from 'redux/passenger/actions'
import paymentsActions from 'redux/payments/actions'
import CustomerSelect from 'components/CustomerSelect/CustomerSelect'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'
import customerActions from 'redux/customerList/actions'

import PaymentSelect from 'components/PaymentSelect/PaymentSelect'

class PassengerList extends Component {
  static defaultProps = {
    isPaymentsModalVisible: false,
    paymentsList: [],
  }

  componentDidMount() {
    const { getPassengers } = this.props
    getPassengers()
  }

  columnsForPayments = () => {
    const { setToPaid, setToUnpaid } = this.props

    const columns = [
      {
        title: 'Data',
        dataIndex: 'payDate',
        key: 'payDate',
        width: '30%',
        render: x => x && new Date(x).toLocaleDateString(),
      },
      {
        title: 'Valor',
        dataIndex: 'value',
        key: 'value',
        width: '20%',
        className: 'text-left',
        render: x => `R$ ${x}`,
      },
      {
        title: 'Forma de pagamento',
        dataIndex: 'method',
        key: 'method',
        width: '20%',
        render: x => {
          const text = paymentMethods[x] || 'Não especificado'

          return text
        },
      },
      {
        title: 'Situação',
        dataIndex: 'paymentstatus',
        key: 'status',
        render: (_, row) => {
          const { id, passengerId, payDate } = row

          const isPaid = !!payDate

          const payload = {
            passengerId,
            paymentId: id,
          }

          return (
            <PaymentSelect
              isPaid={isPaid}
              onChange={() => (isPaid ? setToUnpaid(payload) : setToPaid(payload))}
            />
          )
        },
      },
    ]

    return columns
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
    const { getPayments } = this.props

    getPayments(id)
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
    const { customersList } = this.props

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

  filterData(passengers) {
    const {
      filter: { statusId, query, startPay, fullPay },
    } = this.props
    let filteredData = passengers

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
    const {
      filter: { statusId },
    } = this.props
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
                R$ {row.amountPaid} / R$ {row.ticketPrice.price}
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
    const {
      isPassengerLoading,
      passengers,
      isPaymentsModalVisible,
      closePayments,
      clearPayments,
      paymentsList,
      isPaymentsLoading,
    } = this.props
    const tableColumns = this.columnsForStatus()

    const getPaidColor = paymentPercent => {
      if (paymentPercent === 1) {
        return 'text-success'
      }

      if (paymentPercent > 0.5) {
        return 'text-warning'
      }

      return 'text-danger'
    }

    const passengersList = passengers.map(passenger => {
      const paymentPercent = passenger.amountPaid / passenger.ticketPrice.price

      const passengerPresenterModified = {
        paidColor: getPaidColor(paymentPercent),
        spot: passenger.spot.toString().padStart(2, '0'),
      }

      return { ...passenger, ...passengerPresenterModified }
    })

    // TODO:
    const filteredData = passengersList // this.filterData(passengersList)

    return (
      <React.Fragment>
        <SkeletonTable
          isLoading={isPassengerLoading}
          tableColumns={tableColumns}
          tableData={filteredData}
        />

        <Modal
          title="Datas de pagamento"
          width={700}
          visible={isPaymentsModalVisible}
          okCancel
          onCancel={closePayments}
          afterClose={clearPayments}
          okText="Atualizar"
        >
          <Table
            rowKey={record => `${record.id}${record.payDate}${record.operation}`}
            className="utils__scrollTable"
            scroll={{ x: '100%' }}
            columns={this.columnsForPayments()}
            dataSource={paymentsList}
            pagination={false}
            loading={isPaymentsLoading}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({
  passenger: { isLoading: isPassengerLoading, filter, payload: passengers },
  customerList: { payload: customersList },
  payments: {
    payload: paymentsList,
    isVisible: isPaymentsModalVisible,
    isLoading: isPaymentsLoading,
  },
}) => ({
  isPassengerLoading,
  filter,
  passengers,
  customersList,
  paymentsList,
  isPaymentsModalVisible,
  isPaymentsLoading,
})

const mapDispatchToProps = dispatch => ({
  getPassengers: () => dispatch({ type: passengerActions.GET_PASSENGERS }),
  getPayments: passengerId =>
    dispatch({ type: paymentsActions.GET_PAYMENTS, payload: { passengerId } }),
  setToPaid: ({ passengerId, paymentId }) =>
    dispatch({ type: paymentsActions.SET_TO_PAID, payload: { passengerId, paymentId } }),
  setToUnpaid: ({ passengerId, paymentId }) =>
    dispatch({ type: paymentsActions.SET_TO_UNPAID, payload: { passengerId, paymentId } }),
  getCustomers: () => dispatch({ type: customerActions.GET_CUSTOMERS }),
  closePayments: () => dispatch({ type: paymentsActions.TOGGLE_VISIBILITY, payload: false }),
  clearPayments: () => dispatch({ type: paymentsActions.SET_STATE, payload: [] }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerList)
