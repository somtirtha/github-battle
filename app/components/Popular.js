var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');


function SelectLanguage(props){
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
       <ul className='languages'>
            {languages.map(function(lang){
                return (
                    <li 
                        style={lang === props.selectedLanguage ? {color: '#d0021b'} : null }
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul> 
    );
}

// class SelectLanguage extends React.Component {
//     render(){
//         var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

//         return(
//             <ul className='languages'>
//                 {languages.map(function(lang){
//                     return (
//                         <li 
//                             style={lang === this.props.selectedLanguage ? {color: '#d0021b'} : null }
//                             onClick={this.props.onSelect.bind(null, lang)}
//                             key={lang}>
//                             {lang}
//                         </li>
//                     )
//                 }, this)}
//             </ul>
//         )
//     }
// }

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        }

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        api.fetchPopularRepos(this.state.selectedLanguage)
            .then(function(repos){
                console.log(repos);
            });

    }

    updateLanguage(lang){
        this.setState(function(){
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        api.fetchPopularRepos(lang)
            .then(function(repos){
                console.log(repos);
            });
    }
    
    render() {
        return(
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
            </div>
        )
    }
}

module.exports = Popular;