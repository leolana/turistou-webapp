import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { DateTime } from 'luxon'
import actions from 'redux/excursionList/actions'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'
import { EXCURSION_STATUS_ENUM } from 'constants/excursionStatus'

class ExcursionList extends Component {
  constructor(props) {
    super(props)
    const { getExcursions } = props
    getExcursions()
  }

  remove = id => {
    console.log('remove', id)
    // TODO: exclude...
    let { tableData } = this.state
    tableData = tableData.filter(x => x.id !== id)
    this.setState({ tableData })
  }

  handleRemove(id) {
    Modal.error({
      title: 'Deseja remover esta excursão?',
      content: 'Esta ação não poderá ser desfeita',
      okText: 'Sim',
      okType: 'danger',
      onOk: () => this.remove(id),
      okCancel: true,
      cancelText: 'Não',
    })
  }

  filterTable(tableData) {
    const {
      filter: { query, statusId },
    } = this.props

    if (Number.isInteger(statusId) && EXCURSION_STATUS_ENUM.all !== statusId) {
      const today = DateTime.local()
      tableData = tableData.filter(excursion => {
        const regress = DateTime.fromISO(excursion.regress)

        switch (statusId) {
          case EXCURSION_STATUS_ENUM.done:
            return today > regress
          case EXCURSION_STATUS_ENUM.nexties:
            return today <= regress
          default:
            return true
        }
      })
    }
    if (query) {
      tableData = tableData.filter(excursion => {
        const destination = excursion.destination.toLowerCase()
        if (destination.includes(query.toLowerCase())) return true
        return query.split(' ').every(q => {
          const partialQuery = q.toLowerCase().trim()
          return destination.includes(partialQuery)
        })
      })
    }
    return tableData
  }

  renderActionsButtons = id => (
    <div className="table-action-buttons">
      <Link to={`${id}/passenger`}>
        <Button ghost size="small" type="primary" title="Adicionar passageiro">
          <i className="fa fa-user-plus" />
        </Button>
      </Link>
      <Link to={`${id}/passenger/list`}>
        <Button ghost size="small" type="primary" title="Lista de passageiros">
          <i className="fa fa-users" />
        </Button>
      </Link>
      <Link to={`./${id}`}>
        <Button ghost size="small" type="primary">
          <i className="fa fa-pencil" />
        </Button>
      </Link>
      <Button ghost size="small" type="danger" onClick={() => this.handleRemove(id)}>
        <i className="fa fa-trash" />
      </Button>
    </div>
  )

  render() {
    const { excursions, isLoading } = this.props
    const tableData = this.filterTable(excursions).map(excursion => {
      const spotsFormatter = (transports = [], passengers) => {
        if (!transports.length)
          return { text: 'Nenhum transporte cadastrado!', style: 'text-danger' }

        // FIXME: when has more transports
        const { capacity } = transports[0]
        const places = passengers.length

        const text = `${places} / ${capacity}`

        if (places / capacity > 0.75) {
          return {
            text,
            style: 'text-success',
          }
        }

        if (places / capacity > 0.33) {
          return {
            text,
            style: 'text-warning',
          }
        }

        return {
          text,
          style: 'text-danger',
        }
      }

      return {
        id: excursion.id,
        places: spotsFormatter(excursion.transports, excursion.passengers),
        destination: excursion.destination,
        departureDate: DateTime.fromISO(excursion.departureDate),
        regressDate: DateTime.fromISO(excursion.regressDate),
      }
    })

    const tableColumns = [
      {
        dataIndex: 'id',
        key: 'id',
        render: this.renderActionsButtons,
      },
      {
        title: 'Destino',
        dataIndex: 'destination',
        key: 'destination',
      },
      {
        title: 'Vagas',
        dataIndex: 'places',
        key: 'places',
        className: 'text-center',
        render: key => <span className={key.style}>{key.text}</span>,
      },
      {
        title: 'Partida',
        dataIndex: 'departureDate',
        key: 'departureDate',
        render: x => x.toFormat('dd/MM/yyyy'),
      },
      {
        title: 'Retorno',
        dataIndex: 'regressDate',
        key: 'regressDate',
        render: x => x.toFormat('dd/MM/yyyy'),
      },
    ]

    const props = {
      isLoading,
      tableData,
      tableColumns,
    }

    return <SkeletonTable {...props} />
  }
}

const mapStateToProps = ({ excursionList: { isLoading, filter, payload } }) => ({
  isLoading,
  filter,
  excursions: payload,
})

const mapDispatchToProps = dispatch => ({
  removeItem: () => dispatch({ type: actions.DELETE_DATA }),
  removeItemSuccess: () => dispatch({ type: actions.DELETE_DATA_SUCCESS }),
  getExcursions: () => dispatch({ type: actions.GET_EXCURSIONS }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcursionList)
