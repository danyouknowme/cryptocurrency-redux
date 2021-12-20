import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetExchangesQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';

const { Title, Text } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const globalStats = data?.data;

    if (isFetching) return 'Loading...';

    return (
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
                <Text level={2} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Text>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Lastest Crypto News</Title>
                <Text level={2} className="show-more"><Link to="/news">Show More</Link></Text>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage;
