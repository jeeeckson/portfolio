import React, {Component} from 'react'

class Grid extends Component {
    constructor(props) {
        super(props);

        let repos;
        if (__isBrowser__) {
            repos = window.__INITIAL_DATA__;
            delete window.__INITIAL_DATA__;
        } else {
            repos = this.props.staticContext.data
        }

        this.state = {
            repos,
            loading: !repos
        };

        this.fetchRepos = this.fetchRepos.bind(this)
    }

    componentDidMount() {
        this.fetchRepos()
    }

    fetchRepos() {
        this.setState(() => ({
            loading: true
        }));

        this.props.fetchInitialData('https://api.github.com/users/codemazeblog')
            .then((repos) => this.setState(() => ({
                repos,
                loading: false
            })))
    }

    render() {
        const {loading, repos} = this.state;

        if (loading === true) {
            return <p>LOADING</p>
        }

        return (
            <ul style={{display: 'flex', flexWrap: 'wrap'}}>
                {repos.map(({name, owner, stargazers_count, html_url}) => (
                    <li key={name} style={{margin: 30}}>
                        <ul>
                            <li><a href={html_url}>{name}</a></li>
                            <li>@{owner.login}</li>
                            <li>{stargazers_count} stars</li>
                        </ul>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Grid