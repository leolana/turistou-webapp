import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { DateTime } from 'luxon'
import { deleteExcursion, fetchExcursions } from 'redux/excursionList/actions'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'
import { EXCURSION_STATUS_ENUM } from 'constants/excursionStatus'
import { useQuery } from '@apollo/react-hooks'

const ExcursionList = ({ filter }) => {
  const dispatch = useDispatch()
  const { loading, data, refetch: getExcursions } = useQuery(fetchExcursions)

  const excursions = useMemo(() => data?.excursions || [], [data])

  useEffect(() => {
    getExcursions()
  }, [getExcursions])

  const handleRemove = useCallback(
    (id) => {
      Modal.error({
        title: 'Deseja remover esta excursão?',
        content: 'Esta ação não poderá ser desfeita',
        okText: 'Sim',
        okType: 'danger',
        onOk: () => {
          dispatch(deleteExcursion(id))
        },
        okCancel: true,
        cancelText: 'Não',
      })
    },
    [dispatch],
  )

  const filterTable = useCallback(() => {
    if (!excursions || !excursions.length) return []

    const { query, statusId } = filter
    let filtered = excursions

    if (Number.isInteger(statusId) && EXCURSION_STATUS_ENUM.all !== statusId) {
      const today = DateTime.local()
      filtered = filtered.filter((excursion) => {
        const regress = DateTime.fromISO(excursion.regressDate)

        switch (statusId) {
          case EXCURSION_STATUS_ENUM.done:
            return today > regress
          case EXCURSION_STATUS_ENUM.next:
            return today <= regress
          default:
            return true
        }
      })
    }
    if (query) {
      filtered = filtered.filter((excursion) => {
        const destination = excursion.destination.toLowerCase()
        if (destination.includes(query.toLowerCase())) return true
        return query.split(' ').every((q) => {
          const partialQuery = q.toLowerCase().trim()
          return destination.includes(partialQuery)
        })
      })
    }
    return filtered
  }, [filter, excursions])

  const filteredData = useMemo(
    () =>
      filterTable().map((excursion) => {
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
      }),
    [filterTable],
  )

  const tableColumns = useMemo(() => {
    const renderActionsButtons = (id) => (
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
        <Button ghost size="small" type="danger" onClick={() => handleRemove(id)}>
          <i className="fa fa-trash" />
        </Button>
      </div>
    )

    return [
      {
        dataIndex: 'id',
        key: 'id',
        render: renderActionsButtons,
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
        render: (key) => <span className={key.style}>{key.text}</span>,
      },
      {
        title: 'Partida',
        dataIndex: 'departureDate',
        key: 'departureDate',
        render: (x) => x.toFormat('dd/MM/yyyy'),
      },
      {
        title: 'Retorno',
        dataIndex: 'regressDate',
        key: 'regressDate',
        render: (x) => x.toFormat('dd/MM/yyyy'),
      },
    ]
  }, [handleRemove])

  return <SkeletonTable isLoading={loading} tableData={filteredData} tableColumns={tableColumns} />
}

export default ExcursionList
