import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    if (isFetching) return 'Loading...';

    return (
        <>
            <Row>
                <Col span={6}><Title level={4}>Exchanges</Title></Col>
                <Col span={6}><Title level={4}>24h Trade Volume</Title></Col>
                <Col span={6}><Title level={4}>Markets</Title></Col>
                <Col span={6}><Title level={4}>Change</Title></Col>
            </Row>
            <Row>
                {exchangesList.map((exchange) => (
                <Col span={24}>
                    <Collapse>
                        <Panel
                            key={exchange.id}
                            showArrow={false}
                            header={(
                            <Row key={exchange.id} style={{ width: '100%' }}>
                                <Col span={6}>
                                    <Text><strong>{exchange.rank}.</strong></Text>
                                    <Avatar className="exchange-image" src={exchange.iconUrl} />
                                    <Text><strong>{exchange.name}</strong></Text>
                                </Col>
                                <Col span={6}>${millify(exchange.volume)}</Col>
                                <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                <Col span={6}>{millify(exchange.marketShare)}%</Col>
                            </Row>
                            )}
                        >
                            {HTMLReactParser(exchange.description || '')}
                        </Panel>
                    </Collapse>
                </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;