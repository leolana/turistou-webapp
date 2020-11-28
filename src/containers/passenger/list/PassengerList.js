import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Tag, Modal, Form, InputNumber, Row, Col, Table } from 'antd'
import paymentMethods from 'constants/paymentMethods'

import passengerActions from 'redux/passengerList/actions'
import paymentsActions from 'redux/payments/actions'
import paymentStatusActions from 'redux/paymentStatus/actions'
import CustomerSelect from 'components/CustomerSelect/CustomerSelect'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'
import { fetchCustomers } from 'redux/customerList/actions'

import PaymentSelect from 'components/PaymentSelect/PaymentSelect'
import PaymentUpdateForm from 'components/PaymentUpdateForm/PaymentUpdateForm'

const statusesEnum = {
  booked: 'BOOKED',
  waiting: 'WAITING',
  canceled: 'CANCELED',
}

const statuses = [
  {
    id: 1,
    value: 'BOOKED',
    description: 'Reservado',
    type: 'success',
  },
  {
    id: 2,
    value: 'WAITING',
    description: 'Em espera',
    type: 'warning',
  },
  {
    id: 3,
    value: 'CANCELED',
    description: 'Desistência',
    type: 'danger',
  },
]

class PassengerList extends Component {
  static defaultProps = {
    isPaymentListVisible: false,
    isPaymentFormLoading: false,
    payments: [],
    paymentStatus: {
      amountPaid: 0,
      remaining: 0,
      previousPaid: 0,
    },
  }

  columnsForPayments = () => {
    const { setToPaid, setToPending, setStatusToCanceled } = this.props

    const columns = [
      {
        title: 'Data',
        dataIndex: 'payDate',
        key: 'payDate',
        width: '30%',
        render: (x) => x && new Date(x).toLocaleDateString(),
      },
      {
        title: 'Valor',
        dataIndex: 'value',
        key: 'value',
        width: '20%',
        className: 'text-left',
        render: (x) => `R$ ${x}`,
      },
      {
        title: 'Forma de pagamento',
        dataIndex: 'method',
        key: 'method',
        width: '20%',
        render: (x) => {
          const text = paymentMethods[x] || 'Não especificado'

          return text
        },
      },
      {
        title: 'Situação',
        dataIndex: 'status',
        key: 'status',
        render: (_, row) => {
          const { id, passengerId, status } = row

          const payload = {
            passengerId,
            paymentId: id,
          }

          return (
            <PaymentSelect
              status={status}
              onChange={(statusModified) => {
                if (statusModified === 'paid') {
                  return setToPaid(payload)
                }

                if (statusModified === 'pending') {
                  return setToPending(payload)
                }

                if (statusModified === 'canceled') {
                  return setStatusToCanceled(payload)
                }

                throw Error(`ERROR: status payment not found: ${statusModified}`)
              }}
            />
          )
        },
      },
    ]

    return columns
  }

  exchange = (id) => {
    console.log('id', id)
    // TODO: replace passenger
  }

  book = (id) => {
    console.log('id', id)
    // TODO: move
  }

  remove = (id) => {
    console.log('delete', id)
    // TODO: exclude...

    const { passengersList } = this.state
    const udPassengersList = passengersList.filter((x) => x.id !== id)
    this.setState({ passengersList: udPassengersList })
  }

  update = (id) => {
    const { paymentValue } = this.state
    console.log('update: ', id, paymentValue)
  }

  contentForPaymentsUpdate() {
    const { paymentStatus, addPayment } = this.props

    const content = (
      <Row>
        <Col sm={12}>
          <PaymentUpdateForm formId="paymentUpdateForm" onSubmit={addPayment} />
        </Col>
        <Col sm={12} className="pl-4">
          <div>
            Valor pago anteriormente: <span>{paymentStatus.previousPaid}</span>
          </div>
          <div>
            Total pago: <span>{paymentStatus.amountPaid}</span>
          </div>
          <div>
            Valor faltante: <span>{paymentStatus.remaining}</span>
          </div>
        </Col>
      </Row>
    )

    return content
  }

  handleRemove(id) {
    Modal.error({
      title: 'Removendo o passageiro da excursão',
      width: 700,
      content: (
        <Row>
          <Col md={12}>
            <Form>
              {/* <Form.Item label='Motivo da desistência'>
                <Input size='default' maxLength={150} />
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
    const { getPaymentStatus } = this.props

    getPaymentStatus(id)
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

  renderActionsButtons = (id, status) => {
    const bookedActions = (
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
    )

    const waitingActions = (
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
    )

    const canceledActions = (
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
    )

    if (statusesEnum.booked === status) {
      return bookedActions
    }

    if (statusesEnum.waiting === status) {
      return waitingActions
    }

    if (statusesEnum.canceled === status) {
      return canceledActions
    }

    throw new Error(`Status ${status} not defined in statusesEnum`)
  }

  filterData(passengers) {
    const {
      filter: { status, query, startPay, fullPay },
    } = this.props
    let filteredData = passengers

    if (status) filteredData = filteredData.filter((x) => x.status === status)
    if (fullPay) filteredData = filteredData.filter((x) => x.paid === x.total)
    else if (startPay) filteredData = filteredData.filter((x) => x.paid > 0)
    if (query)
      filteredData = filteredData.filter((x) => {
        const queryPart = query.toLowerCase().split(' ')
        return queryPart.every((q) => x.customer.name.toLowerCase().includes(q))
      })

    return filteredData
  }

  columnsForStatus() {
    const {
      filter: { status },
    } = this.props

    const allColumns = {
      actions: {
        dataIndex: 'id',
        key: 'id',
        render: (id) => this.renderActionsButtons(id, status),
      },
      status: {
        title: 'Situação',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
        render: () => {
          const { description, type } = statuses.find((s) => s.value === status)
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
        render: (value) => <span>R$ {value}</span>,
      },
      value: {
        title: 'Valor pago / Valor total',
        dataIndex: 'value',
        key: 'value',
        className: 'text-center',
        render: (_, row) => {
          if (row.status !== statusesEnum.waiting)
            return (
              <span className={row.paidColor}>
                R$ {row.amountPaid} / R$ {row.ticketPrice?.price}
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

    switch (status) {
      case statusesEnum.booked:
        return [
          allColumns.actions,
          allColumns.name,
          allColumns.value,
          allColumns.ticketType,
          allColumns.spot,
        ]
      case statusesEnum.waiting:
        return [allColumns.actions, allColumns.name, allColumns.telephone]
      case statusesEnum.canceled:
        return [allColumns.actions, allColumns.name, allColumns.reimbursedValue]
      default:
        return [allColumns.status, allColumns.name]
    }
  }

  render() {
    const {
      isPassengerLoading,
      passengers,
      isPaymentListVisible,
      closePaymentsListModal,
      clearPayments,
      payments,
      isPaymentsLoading,
      isPaymentFormVisible,
      clearPaymentStatus,
    } = this.props

    const tableColumns = this.columnsForStatus()

    const getPaidColor = (paymentPercent) => {
      if (paymentPercent === 1) {
        return 'text-success'
      }

      if (paymentPercent > 0.5) {
        return 'text-warning'
      }

      return 'text-danger'
    }

    const passengersList = passengers.map((passenger) => {
      const paymentPercent = passenger.amountPaid / passenger.ticketPrice?.price

      const passengerPresenterModified = {
        paidColor: getPaidColor(paymentPercent),
        spot: passenger.spot.number.toString().padStart(2, '0'),
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
          visible={isPaymentListVisible}
          okCancel
          onCancel={closePaymentsListModal}
          afterClose={clearPayments}
          okText="Atualizar"
        >
          <Table
            rowKey={(record) => `${record.id}${record.payDate}${record.operation}`}
            className="utils__scrollTable"
            scroll={{ x: '100%' }}
            columns={this.columnsForPayments()}
            dataSource={payments}
            pagination={false}
            loading={isPaymentsLoading}
          />
        </Modal>

        <Modal
          title="Atualizar pagamento"
          width={700}
          visible={isPaymentFormVisible}
          footer={[
            <Button onClick={clearPaymentStatus} type="default" key="cancel" htmlType="button">
              Cancelar
            </Button>,
            <Button type="primary" form="paymentUpdateForm" key="submit" htmlType="submit">
              Atualizar
            </Button>,
          ]}
        >
          {this.contentForPaymentsUpdate()}
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({
  passengerList: { isLoading: isPassengerLoading, payload: passengers },
  customerList: { payload: customersList },
  payments: { payload: payments, isVisible: isPaymentListVisible, isLoading: isPaymentsLoading },
  paymentStatus: {
    isVisible: isPaymentFormVisible,
    isLoading: isPaymentFormLoading,
    payload: paymentStatus,
  },
}) => ({
  isPassengerLoading,
  passengers,
  customersList,
  payments,
  isPaymentListVisible,
  isPaymentsLoading,
  isPaymentFormVisible,
  isPaymentFormLoading,
  paymentStatus,
})

const mapDispatchToProps = (dispatch) => ({
  getPassengers: (filter) => dispatch({ type: passengerActions.GET_PASSENGERS, filter }),
  getPayments: (passengerId) =>
    dispatch({ type: paymentsActions.GET_PAYMENTS, payload: { passengerId } }),
  getPaymentStatus: (passengerId) =>
    dispatch({ type: paymentStatusActions.GET_PAYMENT_STATUS, payload: { passengerId } }),
  setToPaid: ({ passengerId, paymentId }) =>
    dispatch({ type: paymentsActions.SET_TO_PAID, payload: { passengerId, paymentId } }),
  setToPending: ({ passengerId, paymentId }) =>
    dispatch({ type: paymentsActions.SET_TO_UNPAID, payload: { passengerId, paymentId } }),
  setStatusToCanceled: ({ passengerId, paymentId }) =>
    dispatch({ type: paymentsActions.SET_TO_CANCELED, payload: { passengerId, paymentId } }),
  getCustomers: () => dispatch(fetchCustomers()),
  closePaymentsListModal: () =>
    dispatch({ type: paymentsActions.TOGGLE_VISIBILITY, payload: false }),
  clearPayments: () => dispatch({ type: paymentsActions.SET_STATE, payload: [] }),
  addPayment: (values) =>
    dispatch({ type: paymentStatusActions.PAYMENT_INSERT, payload: { values } }),
  clearPaymentStatus: () => dispatch({ type: paymentStatusActions.CLEAR_PAYMENT_STATUS }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerList)
